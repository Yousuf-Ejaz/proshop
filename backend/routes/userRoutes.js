import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

import {
	RegisterUser,
	authUser,
	getUserProfile,
	updateUserProfile,
} from "../controllers/userController.js";

router.route("/").post(RegisterUser);
router.route("/login").post(authUser);
router
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);

export default router;
