// middleware/boardAuth.js
import Board from '../models/Board.js';

export async function requireBoardMembership(req, res, next) {
  const userId = req.user._id;
  const boardId = req.params.boardId || req.body.boardId || req.query.boardId;
  if (!boardId) return res.status(400).json({ error: 'boardId required' });
  const board = await Board.findById(boardId);
  if (!board) return res.status(404).json({ error: 'Board not found' });
  const member = board.members.find(m => m.user.toString() === userId.toString());
  if (!member && board.creator.toString() !== userId.toString()) {
    return res.status(403).json({ error: 'Not a board member' });
  }
  req.board = board;
  req.boardMemberRole = (member && member.role) || (board.creator.toString() === userId.toString() ? 'admin' : null);
  next();
}

export function requireBoardAdmin(req, res, next) {
  if (!req.board) return res.status(500).json({ error: 'Board not loaded' });
  const userId = req.user._id.toString();
  const isCreator = req.board.creator.toString() === userId;
  const member = req.board.members.find(m => m.user.toString() === userId);
  const isAdmin = isCreator || (member && member.role === 'admin');
  if (!isAdmin) return res.status(403).json({ error: 'Admin only' });
  next();
}
