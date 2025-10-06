import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createTask,
  updateTask,
  deleteTask,
  moveTask
} from "../controllers/taskController.js";

const router = express.Router();

// Create a task
router.post("/", protect, createTask);

// Update task details
router.put("/:id", protect, updateTask);

// Delete task
router.delete("/:id", protect, deleteTask);

// Move task (drag-and-drop)
router.put("/:id/move", protect, moveTask);

export default router;
