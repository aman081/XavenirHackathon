import jwt from "jsonwebtoken";
import { AdminPassword, AdminUsername, COOKIE_OPTIONS } from "../constants.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import MyError from "../utils/MyError.js";
import MyResponse from "../utils/MyResponse.js";

const loginAdmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
        throw new MyError(400, "Missing username or password");

    if (username !== AdminUsername || password !== AdminPassword)
        throw new MyError(401, "Invalid username or password");

    const token = jwt.sign(
        {
            username,
            password,
        },
        process.env.TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.TOKEN_EXPIRATION_TIME,
        },
    );

    const response = new MyResponse(200, "Admin logged in successfully");

    return res
        .status(200)
        .cookie("token", token, COOKIE_OPTIONS)
        .json(response);
});

const logoutAdmin = asyncHandler(async (req, res) => {
    const response = new MyResponse(200, "Admin logged out successfully");
    return res.status(200).clearCookie("token", COOKIE_OPTIONS).json(response);
});

export { loginAdmin, logoutAdmin };
