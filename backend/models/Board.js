// models/Board.js
import mongoose from 'mongoose';
const boardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // initial admin
  members: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, role: { type: String, enum: ['admin','member'], default: 'member' } }],
}, { timestamps: true });
export default mongoose.model('Board', boardSchema);
