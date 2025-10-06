// models/ActivityLog.js
import mongoose from 'mongoose';
const activitySchema = new mongoose.Schema({
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true }, // e.g., 'task_created','task_moved',...
  description: { type: String, required: true },
  metadata: mongoose.Schema.Types.Mixed, // extra details (from/to columns, task snapshot etc.)
}, { timestamps: true });
export default mongoose.model('ActivityLog', activitySchema);
