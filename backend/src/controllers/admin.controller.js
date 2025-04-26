import jwt from "jsonwebtoken";
import { AdminPassword, AdminUsername, COOKIE_OPTIONS } from "../constants.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import MyError from "../utils/MyError.js";
import MyResponse from "../utils/MyResponse.js";
import { Distributor } from "../models/Distributor.models.js";

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

const verifyDistributor = asyncHandler(async (req, res) => {
    const { distributorId } = req.params;
    if (!distributorId) throw new MyError(400, "Distributor ID is missing");

    const distributor = await Distributor.findById(distributorId);
    if (!distributor) throw new MyError(404, "Distributor not found");

    distributor.isVerified = true;
    await distributor.save();

    return res
        .status(200)
        .json(new MyResponse(200, "Distributor verified successfully"));
});

const rejectDistributor = asyncHandler(async (req, res) => {
    const { distributorId } = req.params;
    if (!distributorId) throw new MyError(400, "Distributor ID is missing");

    const distributor = await Distributor.findById(distributorId);
    if (!distributor) throw new ApiError(404, "Distributor not found");

    await Distributor.findByIdAndDelete(distributorId);
    return res
        .status(200)
        .json(new MyResponse(200, "Distributor rejected successfully"));
});

const getUnverifiedDistributors = asyncHandler(async (req, res) => {
    const unverifiedDistributors = await Distributor.find({
        isVerified: false,
    }).select("-password");

    if (!unverifiedDistributors.length)
        throw new MyError(404, "No unverified distributors found");

    const unverifiedDistributorsId = unverifiedDistributors.map(
        (distributor) => (id = distributor._id),
    );

    return res
        .status(200)
        .json(
            new MyResponse(
                200,
                unverifiedDistributorsId,
                "Found unverified distributors",
            ),
        );
});

export {
    loginAdmin,
    logoutAdmin,
    verifyDistributor,
    rejectDistributor,
    getUnverifiedDistributors,
};
