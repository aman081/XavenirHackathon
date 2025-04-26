import express from "express";
import isAuthenticated from "../middlewares/auth.middleware.js";
import {
    getSuppliesNearMe,
    loginDistributor,
    logoutDistributor,
    registerDistributor,
    selectSupply,
} from "../controllers/distributor.controller.js";

const app = express.Router();

app.post("/register", upload.single("avatar"), registerDistributor);
app.post("/login", loginDistributor);
app.get("/logout", logoutDistributor);

app.use(isAuthenticated);
app.post("/get-supplies", getSuppliesNearMe);
app.post("/select-supply", selectSupply);
// app.post("/supplied", upload.single("foodPhoto"), supplyFood);

export default app;
