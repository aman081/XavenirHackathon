import { Router } from "express";
import {
    getUnverifiedDistributors,
    loginAdmin,
    logoutAdmin,
    rejectDistributor,
    verifyDistributor,
} from "../controllers/admin.controller.js";

const router = Router();

router.route("/login").post(loginAdmin);
router.route("/logout").post(logoutAdmin);

router.route("/getUnverifiedDistributors").get(getUnverifiedDistributors);
router.route("/verifyDistributors").get(verifyDistributor);
router.route("/rejectDistributor").get(rejectDistributor);

export default router;
