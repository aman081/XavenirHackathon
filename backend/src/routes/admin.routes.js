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
router.route("/verifyDistributors/:distributorId").get(verifyDistributor);
router.route("/rejectDistributor/:distributorId").get(rejectDistributor);

export default router;
