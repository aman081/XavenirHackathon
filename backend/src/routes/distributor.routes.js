import express from "express";
import upload from "../middlewares/multer.middleware.js";
import isAuthenticated from "../middlewares/auth.middleware.js";
import {
    getSuppliesNearMe,
    loginDistributor,
    logoutDistributor,
    registerDistributor,
    selectSupply,
    givePhotoForSupply,
    giveRating,
    getCurrentDistributor
} from "../controllers/distributor.controller.js";
import upload from "../middlewares/multer.middleware.js";

const app = express.Router();

// Public routes
app.post("/register", upload.single("avatar"), registerDistributor);
app.post("/login", loginDistributor);
app.get("/logout", logoutDistributor);

// Protected routes
app.use(isAuthenticated);

app.get("/profile", getCurrentDistributor);
app.get("/supplies-near-me", getSuppliesNearMe);
app.post("/select-supply/:supplyId", selectSupply);
app.post("/give-photo", upload.single("photo"), givePhotoForSupply);
app.post("/give-rating", giveRating);

export default app;
