import express from "express";
import {
  createHost,
  getAllHosts,
  getHostById,
  updateHost,
  deleteHost,
} from "../controllers/hostController.js";

const router = express.Router();

router.get("/", getAllHosts);
router.get("/:id", getHostById);

router.post("/", createHost);
router.put("/:id", updateHost);
router.delete("/:id", deleteHost);
router.post("/experiences", createExperience);

export default router;
