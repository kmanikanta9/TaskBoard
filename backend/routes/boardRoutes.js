import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/roleMiddleware.js";
import {
  createBoard,
  deleteBoard,
  inviteUser,
  getBoards
} from "../controllers/boardController.js";

const router = express.Router();

// Get all boards for logged-in user
router.get("/", protect, getBoards);

// Create new board (Admin only)
router.post("/", protect, adminOnly, createBoard);

// Delete board (Admin only)
router.delete("/:id", protect, adminOnly, deleteBoard);

// Invite user to board (Admin only)
router.post("/:id/invite", protect, adminOnly, inviteUser);

export default router;
