import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { COOKIE_OPTIONS } from "../constants.js";

import { Distributor } from "../models/Distributor.models.js";
import { Supply } from "../models/supply.models.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import uploadFileOnCloudinary from "../utils/Cloudinary.js";
import MyError from "../utils/MyError.js";
import MyResponse from "../utils/MyResponse.js";
import { Provider } from "../models/provider.models.js";

const registerDistributor = asyncHandler(async (req, res) => {
    const { name, email, password, uniqueIdentifier } = req.body;

    if (!name || !email || !password || !uniqueIdentifier)
        throw new MyError(400, "All fields are required");

    const existing = await Distributor.findOne({ email });
    if (existing) throw new MyError(409, "Distributor already exists");

    const avatarLocalPath = req.file?.path;
    const avatar = await uploadFileOnCloudinary(name, avatarLocalPath);

    if (!avatar)
        throw new MyError(500, "Failed to upload avatar to Cloudinary");

    const distributor = await Distributor.create({
        name,
        email,
        password,
        avatar,
        uniqueIdentifier,
    });

    if (!distributor) throw new MyError(500, "Failed to register distributor");
    distributor.password = undefined;

    return res
        .status(201)
        .json(
            new MyResponse(
                201,
                "Distributor registered successfully! Waiting to be verified!",
                { distributor },
            ),
        );
});

const loginDistributor = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        throw new MyError(400, "Email and password are required");

    const distributor = await Distributor.findOne({ email });
    if (!distributor) throw new MyError(404, "Distributor not found");

    const isMatch = await compare(password, distributor.password);
    if (!isMatch) throw new MyError(401, "Invalid credentials");

    const token = jwt.sign(
        { id: distributor._id },
        process.env.TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.TOKEN_EXPIRATION_TIME,
        },
    );

    distributor.password = undefined;

    return res
        .status(200)
        .cookie("token", token, COOKIE_OPTIONS)
        .json(new MyResponse(200, "Logged in successfully", { distributor }));
});

const logoutDistributor = asyncHandler(async (req, res) => {
    res.clearCookie("token", COOKIE_OPTIONS);
    return res.status(200).json(new MyResponse(200, "Logged out successfully"));
});

const giveRating = asyncHandler(async (req, res) => {
    const { supplyId, rating } = req.body;
    if (!supplyId || !rating)
        throw new MyError(404, "Provider ID and rating are required");

    if (rating < 1 || rating > 5) {
        throw new MyError(400, "Rating must be between 1 and 5");
    }

    const supply = await Supply.findById(supplyId);

    if (!supply) throw new MyError(404, "Supply not found");

    const provider = await Provider.findById(supply.providerId);
    if (!provider) throw new MyError(404, "Provider not found");

    if (supply.providerRating)
        throw new MyError(
            400,
            "You have already given a rating for this provider",
        );

    supply.providerRating = rating;

    await supply.save();

    const newCount = provider.rating.count + 1;
    const newAverage =
        (provider.rating.average * provider.rating.count + rating) / newCount;
    await Provider.findByIdAndUpdate(supply.providerId, {
        $set: {
            "rating.average": newAverage,
            "rating.count": newCount,
        },
    });

    return res
        .status(200)
        .json(new MyResponse(200, "Rating given successfully"));
});

const getSuppliesNearMe = asyncHandler(async (req, res) => {
    const { latitude, longitude, maxDistance = 5000000000000 } = req.query;

    if (!latitude || !longitude)
        throw new MyError(400, "Latitude and Longitude are required");

    const supplies = await Supply.find({
        providerLocation: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [parseFloat(longitude), parseFloat(latitude)],
                },
                $maxDistance: parseInt(maxDistance),
            },
        },
        receiver: null,
    });

    if (!supplies.length) throw new MyError(404, "No supplies found nearby");

    return res
        .status(200)
        .json(new MyResponse(200, "Supplies fetched successfully", supplies));
});

const selectSupply = asyncHandler(async (req, res) => {
    const { supplyId, location } = req.params;

    if (!supplyId) throw new MyError(400, "Supply ID is required");

    const distributorId = req.user;

    const supply = await Supply.findById(supplyId);
    if (!supply) throw new MyError(404, "Supply not found");

    if (supply.receiver)
        throw new MyError(
            400,
            "This supply is already assigned to a distributor",
        );

    supply.recepients.push(distributorId);
    await supply.save();

    return res
        .status(200)
        .json(new MyResponse(200, "Supply selected successfully", supply));
});

const givePhotoForSupply = asyncHandler(async (req, res) => {
    const { supplyId } = req.body;
    if (!supplyId) throw new MyError(400, "Supply ID is required");
    if (!req.file) throw new MyError(400, "Photo is required");

    const distributorId = req.user;

    const supply = await Supply.findById(supplyId);
    if (!supply) throw new MyError(404, "Supply not found");

    if (supply.receiver.toString() !== distributorId.toString())
        throw new MyError(
            403,
            "You are not authorized to give photo for this supply",
        );

    const photoLocalPath = req.file?.path;
    supply.photo = await uploadFileOnCloudinary(supply._id, photoLocalPath);

    await supply.save();
    return res
        .status(200)
        .json(new MyResponse(200, "Photo uploaded successfully", supply));
});

const getCurrentDistributor = asyncHandler(async (req, res) => {
    const distributor = await Distributor.findById(req.user);
    if (!distributor) throw new MyError(404, "Distributor not found");
    distributor.password = undefined;
    return res.status(200).json(
        new MyResponse(200, "Distributor fetched successfully", {
            distributor,
        }),
    );
});

export {
    getSuppliesNearMe,
    loginDistributor,
    logoutDistributor,
    registerDistributor,
    selectSupply,
    givePhotoForSupply,
    getCurrentDistributor,
    giveRating,
};
