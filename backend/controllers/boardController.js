import Board from "../models/Board.js";
import ActivityLog from "../models/ActivityLog.js";
import User from "../models/User.js";

// @desc   Create a board
// @route  POST /api/boards
// @access Admin
export const createBoard = async (req, res) => {
  const { title, description } = req.body;

  const board = await Board.create({
    title,
    description,
    admin: req.user._id,
    members: [req.user._id],
  });

  // Activity log
  await ActivityLog.create({
    action: "Board created",
    user: req.user._id,
    board: board._id,
  });

  res.status(201).json(board);
};

// @desc   Delete a board
// @route  DELETE /api/boards/:id
// @access Admin
export const deleteBoard = async (req, res) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }

  if (board.admin.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await board.remove();

  await ActivityLog.create({
    action: "Board deleted",
    user: req.user._id,
    board: req.params.id,
  });

  res.json({ message: "Board deleted" });
};

// @desc   Invite user to board
// @route  POST /api/boards/:id/invite
// @access Admin
export const inviteUser = async (req, res) => {
  const { email } = req.body;
  const board = await Board.findById(req.params.id);
  if (!board) return res.status(404).json({ message: "Board not found" });

  if (board.admin.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  if (!board.members.includes(user._id)) {
    board.members.push(user._id);
    await board.save();

    await ActivityLog.create({
      action: `User ${user.name} added to board`,
      user: req.user._id,
      board: board._id,
    });
  }

  res.json({ message: `${user.name} added to board` });
};

// @desc   Get all boards for a user
// @route  GET /api/boards
// @access Private
export const getBoards = async (req, res) => {
  const boards = await Board.find({ members: req.user._id });
  res.json(boards);
};
