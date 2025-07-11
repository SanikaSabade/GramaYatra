import express from "express";
import {
  createHost,
  getAllHosts,
  getHostById,
  updateHost,
  deleteHost,
} from "../controllers/hostController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllHosts);          
router.get("/:id", protect, getHostById);       

router.post("/", protect, createHost);        
router.put("/:id", protect, updateHost);        
router.delete("/:id", protect, deleteHost);    

export default router;
