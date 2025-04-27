import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};
export const DEFAULT_USER_AVATAR_FILE_PATH = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/v1743310701/defaultUserAvatar.jpg`;
export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    // sameSite: "None",
};
export const AVATAR_TEMP_PATH = path.join(__dirname, "../public/temp");
export const AdminUsername = "admin";
export const AdminPassword = "admin";
