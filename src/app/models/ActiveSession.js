import mongoose from "mongoose";

const ActiveSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 }, // auto-expire after 1hr
});

export default mongoose.models.ActiveSession ||
  mongoose.model("ActiveSession", ActiveSessionSchema);
