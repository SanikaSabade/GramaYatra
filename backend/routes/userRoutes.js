import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getProfile,
  addFavoriteExperience,
  removeFavoriteExperience,
  getFavoriteExperiences,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.post("/favorites/:experienceId", protect, addFavoriteExperience);
router.delete("/favorites/:experienceId", protect, removeFavoriteExperience);
router.get("/favorites", protect, getFavoriteExperiences);

export default router;
