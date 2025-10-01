import mongoose from "mongoose";
const { Schema } = mongoose;
const auctionSchema = new Schema({
  title: String,
  description: String,
  images: String,
  startingPrice: Number,
  currentPrice: Number,
  startTime: String,
  endTime: String,
  status: {
    type: String,
    enum: ["upcoming", "active", "ended"],
    default: "upcoming",
  },
  sellerId: { type: Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.models.Auction ||
  mongoose.model("Auction", auctionSchema);
