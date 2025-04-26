import express from "express";
import upload from "../middlewares/multer.middleware.js";
import {
    chooseDistributor,
    giveRating,
    loginProvider,
    logoutProvider,
    registerProvider,
    showRecepients,
    supplyFood,
    getCurrentProvider,
} from "../controllers/provider.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const app = express.Router();

app.post("/register", upload.single("avatar"), registerProvider);
app.post("/login", loginProvider);
app.get("/logout", logoutProvider);
app.get("/profile", isAuthenticated, getCurrentProvider);

app.use(isAuthenticated);
app.post("/supply", upload.single("foodPhoto"), supplyFood);

app.post("/recepients", showRecepients);
app.post("/choose-distributor", chooseDistributor);
app.post("/give-rating", giveRating);

export default app;
