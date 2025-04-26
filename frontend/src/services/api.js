import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5004",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Get the token from the cookie
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const provider = {
  register: (data) => api.post("/provider/register", data),
  login: (data) => api.post("/provider/login", data),
  logout: () => api.get("/provider/logout"),
  getProfile: () => api.get("/provider/profile"),
  supplyFood: (data) => api.post("/provider/supply", data),
}; 