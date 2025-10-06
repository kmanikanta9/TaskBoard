import Column from "../models/Column.js";
import Board from "../models/Board.js";
import ActivityLog from "../models/ActivityLog.js";

// @desc   Create column
// @route  POST /api/columns
// @access Admin
export const createColumn = async (req, res) => {
  const { title, boardId } = req.body;
  const board = await Board.findById(boardId);
  if (!board) return res.status(404).json({ message: "Board not found" });

  if (board.admin.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  const column = await Column.create({ title, board: boardId });

  await ActivityLog.create({
    action: `Column ${title} created`,
    user: req.user._id,
    board: boardId,
  });

  res.status(201).json(column);
};

// @desc   Get columns for board
// @route  GET /api/columns/:boardId
// @access Private
export const getColumns = async (req, res) => {
  const columns = await Column.find({ board: req.params.boardId }).sort({ order: 1 });
  res.json(columns);
};
