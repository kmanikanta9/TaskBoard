import Task from "../models/Task.js";
import Column from "../models/Column.js";
import Board from "../models/Board.js";
import ActivityLog from "../models/ActivityLog.js";
import { getIO } from "../config/socket.js";

// @desc   Create a task
// @route  POST /api/tasks
// @access Private
export const createTask = async (req, res) => {
  const { title, description, columnId, assignedTo, dueDate } = req.body;
  const column = await Column.findById(columnId);
  if (!column) return res.status(404).json({ message: "Column not found" });

  const board = await Board.findById(column.board);
  if (!board.members.includes(req.user._id))
    return res.status(403).json({ message: "Not authorized" });

  const task = await Task.create({ title, description, column: columnId, assignedTo, dueDate });

  await ActivityLog.create({
    action: `Task "${title}" created`,
    user: req.user._id,
    board: board._id,
    task: task._id,
  });

  // Emit socket event
  getIO().to(board._id.toString()).emit("taskUpdated", task);

  res.status(201).json(task);
};

// @desc   Update task
// @route  PUT /api/tasks/:id
// @access Private
export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  const column = await Column.findById(task.column);
  const board = await Board.findById(column.board);
  if (!board.members.includes(req.user._id))
    return res.status(403).json({ message: "Not authorized" });

  Object.assign(task, req.body);
  await task.save();

  await ActivityLog.create({
    action: `Task "${task.title}" updated`,
    user: req.user._id,
    board: board._id,
    task: task._id,
  });

  getIO().to(board._id.toString()).emit("taskUpdated", task);
  res.json(task);
};

// @desc   Delete task
// @route  DELETE /api/tasks/:id
// @access Private
export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  const column = await Column.findById(task.column);
  const board = await Board.findById(column.board);
  if (!board.members.includes(req.user._id))
    return res.status(403).json({ message: "Not authorized" });

  await task.remove();

  await ActivityLog.create({
    action: `Task "${task.title}" deleted`,
    user: req.user._id,
    board: board._id,
    task: task._id,
  });

  getIO().to(board._id.toString()).emit("taskUpdated", { deleted: true, id: task._id });
  res.json({ message: "Task deleted" });
};

// @desc   Move task (drag-and-drop)
// @route  PUT /api/tasks/:id/move
// @access Private
export const moveTask = async (req, res) => {
  const { destinationColumnId, order } = req.body;
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  const column = await Column.findById(task.column);
  const board = await Board.findById(column.board);
  if (!board.members.includes(req.user._id))
    return res.status(403).json({ message: "Not authorized" });

  task.column = destinationColumnId;
  if (order !== undefined) task.order = order;
  await task.save();

  await ActivityLog.create({
    action: `Task "${task.title}" moved`,
    user: req.user._id,
    board: board._id,
    task: task._id,
  });

  getIO().to(board._id.toString()).emit("taskUpdated", task);
  res.json(task);
};
