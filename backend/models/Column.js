// models/Column.js
import mongoose from 'mongoose';
const columnSchema = new mongoose.Schema({
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true, index: true },
  title: { type: String, required: true },
  order: { type: Number, default: 0 }, // for ordering columns
}, { timestamps: true });
export default mongoose.model('Column', columnSchema);
