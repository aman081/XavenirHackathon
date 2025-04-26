import { Provider } from "../models/provider.models.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import MyError from "../utils/MyError.js";
import uploadFileOnCloudinary from "../utils/Cloudinary.js";
import jwt from "jsonwebtoken";
import { COOKIE_OPTIONS } from "../constants.js";
import MyResponse from "../utils/MyResponse.js";
import { compare } from "bcrypt";
import { Supply } from "../models/supply.models.js";
import { Distributor } from "../models/distributor.models.js";

const registerProvider = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        throw new MyError(404, "All fields are required");

    const avatarLocalPath = req.file?.path;
    const avatar = await uploadFileOnCloudinary(name, avatarLocalPath);

    if (!avatar) {
        throw new MyError(500, "Failed to upload avatar to Cloudinary!");
    }

    const provider = await Provider.create({ name, email, password, avatar });

    if (!provider) throw new MyError(500, "Failed to create provider");

    return res.status(201).json(
        new MyResponse(201, "Provider registered successfully", {
            provider,
        }),
    );
});

const loginProvider = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        throw new MyError(404, "Email and password are required");

    const provider = await Provider.findOne({ email });
    if (!provider) throw new MyError(404, "User not found");

    const isMatch = await compare(password, provider.password);
    if (!isMatch) throw new MyError(401, "Invalid password");

    const token = jwt.sign({ id: provider._id }, process.env.TOKEN_SECRET_KEY);
    provider.password = undefined;
    return res
        .status(200)
        .cookie("token", token, COOKIE_OPTIONS)
        .json(new MyResponse(200, "Logged in successfully", { provider }));
});

const logoutProvider = asyncHandler(async (req, res) => {
    res.clearCookie("token", COOKIE_OPTIONS);
    return res.status(200).json(new MyResponse(200, "Logged out successfully"));
});

const supplyFood = asyncHandler(async (req, res) => {
    const { foods, providerLatitude, providerLongitude } = req.body;
    if (!foods || !foods.length || !providerLatitude || !providerLongitude)
        throw new MyError(400, "Foods and provider location are required");

    const supplyPhotoPath = req.file?.path;
    const providerSupplyPhoto = await uploadFileOnCloudinary(
        req.file.filename,
        supplyPhotoPath,
    );

    const providerLocation = {
        type: "Point",
        coordinates: [
            parseFloat(providerLongitude),
            parseFloat(providerLatitude),
        ],
    };

    const supply = await Supply.create({
        food: foods,
        providerSupplyPhoto,
        providerLocation,
    });

    if (!supply) throw new MyError(500, "Failed to create supply");

    // TODO: socket.emit to distributors (you mentioned)

    return res
        .status(201)
        .json(new MyResponse(201, "Food provided successfully", { supply }));
});

const showRecepients = asyncHandler(async (req, res) => {
    const { supplyId } = req.body;
    if (!supplyId) throw new MyError(400, "Supply ID is required");

    const supply = await Supply.findById(supplyId).populate("recepients");
    if (!supply) throw new MyError(404, "Supply not found");

    if (!supply.recepients.length)
        throw new MyError(404, "No recepients found for this supply");

    return res.status(200).json(
        new MyResponse(200, "Recepients fetched", {
            recepients: supply.recepients,
        }),
    );
});

const chooseDistributor = asyncHandler(async (req, res) => {
    const {
        supplyId,
        distributorId,
        distributorLatitude,
        distributorLongitude,
    } = req.body;

    if (
        !supplyId ||
        !distributorId ||
        !distributorLatitude ||
        !distributorLongitude
    )
        throw new MyError(
            400,
            "Supply ID, distributor ID and location are required",
        );

    const distributorLocation = {
        type: "Point",
        coordinates: [
            parseFloat(distributorLongitude),
            parseFloat(distributorLatitude),
        ],
    };

    const supply = await Supply.findById(supplyId);
    if (!supply) throw new MyError(404, "Supply not found");

    supply.receiver = distributorId;
    supply.recepients = [];
    supply.distributorLocation = distributorLocation;
    await supply.save();

    return res
        .status(200)
        .json(
            new MyResponse(200, "Distributor chosen successfully", { supply }),
        );
});

const giveRating = asyncHandler(async (req, res) => {
    const { supplyId, rating } = req.body;
    if (!supplyId || !rating)
        throw new MyError(404, "Provider ID and rating are required");

    if (rating < 1 || rating > 5) {
        throw new MyError(400, "Rating must be between 1 and 5");
    }

    const supply = await Supply.findById(supplyId);

    if(!supply) throw new MyError(404, "Supply not found");


    const distributor = await Distributor.findById(supply.distributorId);
    if (!distributor) throw new MyError(404, "distributor not found");

    if (supply.distributorRating)
        throw new MyError(
            400,
            "You have already given a rating for this distributor",
        );

    supply.distributorRating = rating;

    await supply.save();

    const newCount = distributor.rating.count + 1;
    const newAverage =
        (distributor.rating.average * distributor.rating.count + rating) / newCount;
    await Distributor.findByIdAndUpdate(supply.distributorId, {
        $set: {
            "rating.average": newAverage,
            "rating.count": newCount,
        },
    });

    return res
       .status(200)
       .json(new MyResponse(200, "Rating given successfully"));
});

const getCurrentProvider = asyncHandler(async (req, res) => {
    const provider = await Provider.findById(req.user);
    if (!provider) throw new MyError(404, "Provider not found");
    provider.password = undefined;
    return res.status(200).json(new MyResponse(200, "Provider fetched successfully", { provider }));
});

export {
    registerProvider,
    loginProvider,
    logoutProvider,
    supplyFood,
    showRecepients,
    chooseDistributor,
    giveRating,
    getCurrentProvider
};
