import mongoose from "mongoose";
const { Schema } = mongoose;
const auctionSchema = new Schema({
  title: String,
  description: String,
  images: String,
  startingPrice: Number,
  currentPrice: Number,
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  cloudImg: String,
  status: {
    type: String,
    enum: ["upcoming", "active", "ended"],
    default: "upcoming",
  },
  sellerId: { type: Schema.Types.ObjectId, ref: "User" },
  winnerId: { type: Schema.Types.ObjectId, ref: "User" },
  finalPrice: Number,
});

export default mongoose.models.Auction ||
  mongoose.model("Auction", auctionSchema);
