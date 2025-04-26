export const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};
export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    // sameSite: "None",
};
