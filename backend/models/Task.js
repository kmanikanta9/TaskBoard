// models/Task.js
import mongoose from 'mongoose';
const taskSchema = new mongoose.Schema({
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true, index: true },
  column: { type: mongoose.Schema.Types.ObjectId, ref: 'Column', required: true, index: true },
  title: { type: String, required: true },
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dueDate: Date,
  order: { type: Number, default: 0 }, // position inside the column: helps ordering & pagination stable results
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

taskSchema.index({ board: 1, column: 1, order: 1 }); // helpful
export default mongoose.model('Task', taskSchema);
