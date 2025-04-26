import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

const isAuthenticated = asyncHandler((req, res, next) => {
    const token = req.cookies["token"];

    if (!token) throw new Error(403, "Not authenticated");

    const decodedData = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.user = decodedData.id;
    next();
});

export default isAuthenticated;
