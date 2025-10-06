import ActivityLog from "../models/ActivityLog.js";

// @desc   Get activity logs for a board
// @route  GET /api/activities/:boardId
// @access Private
export const getActivityLogs = async (req, res) => {
  const logs = await ActivityLog.find({ board: req.params.boardId })
    .populate("user", "name email")
    .populate("task", "title")
    .sort({ createdAt: -1 });

  res.json(logs);
};
