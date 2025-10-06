import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getActivityLogs } from "../controllers/activityController.js";

const router = express.Router();

// Get activity logs for a board
router.get("/:boardId", protect, getActivityLogs);

export default router;
