// routes/experienceRoutes.js
import express from "express";
import {
  getExperiencesByHost,
  getPublicExperiences,
  createExperience,
} from "../controllers/experienceController.js";

const router = express.Router();

// All public experiences
router.get("/public", getPublicExperiences);

// All experiences by a specific host
router.get("/host/:hostId", getExperiencesByHost);

router.post("/", createExperience);

export default router;
