import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  deadline: Date,
  subject: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
}, { timestamps: true });

export default mongoose.model('Assignment', assignmentSchema);
