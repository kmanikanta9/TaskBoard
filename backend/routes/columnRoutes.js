import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createColumn, getColumns } from "../controllers/columnController.js";
import { adminOnly } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Create a column in a board (Admin only)
router.post("/", protect, adminOnly, createColumn);

// Get all columns for a board
router.get("/:boardId", protect, getColumns);

export default router;
