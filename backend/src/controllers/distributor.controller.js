import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { COOKIE_OPTIONS } from "../constants.js";
import { Distributor } from "../models/Distributor.models.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import uploadFileOnCloudinary from "../utils/Cloudinary.js";
import MyError from "../utils/MyError.js";
import MyResponse from "../utils/MyResponse.js";

const registerDistributor = asyncHandler(async (req, res) => {
    const { name, email, password, uniqueIdentifier } = req.body;

    if (!name || !email || !password || !uniqueIdentifier)
        throw new MyError(404, "All fields are required");

    const avatarLocalPath = req.file?.path;
    const avatar = await uploadFileOnCloudinary(name, avatarLocalPath);

    if (!avatar)
        throw new MyError(500, "Failed to upload avatar to Cloudinary!");

    const provider = await Distributor.create({
        name,
        email,
        password,
        avatar,
        uniqueIdentifier,
    });

    if (!provider) throw new MyError(500, "Failed to create provider");

    return res
        .status(201)
        .json(
            new MyResponse(
                201,
                "Distributor registered successfully! Waiting to be verified!",
                { provider },
            ),
        );
});

const loginDistributor = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        throw new MyError(404, "Email and password are required");

    const provider = await Distributor.findOne({ email });
    if (!provider) throw new MyError(404, "User not found");

    const isMatch = await compare(password, provider.password);
    if (!isMatch) throw new MyError(401, "Invalid password");

    const token = jwt.sign({ id: provider._id }, process.env.TOKEN_SECRET_KEY);
    return res
        .status(200)
        .cookie("token", token, COOKIE_OPTIONS)
        .json(new MyResponse(200, "Logged in successfully", { provider }));
});

const logoutDistributor = asyncHandler(async (req, res) => {
    res.clearCookie("token", COOKIE_OPTIONS);
    return res.status(200).json(new MyResponse(200, "Logged out successfully"));
});

export { loginDistributor, logoutDistributor, registerDistributor };
