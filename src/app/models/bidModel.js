import mongoose from "mongoose";
const bidSchema = new mongoose.Schema({
  auctionId: {
    type: Schema.types.ObjectId,
    ref: "Auction",
  },
  bidderId: {
    type: Schema.types.ObjectId,
    ref: "User",
  },
  amount: Number,
  createdAt,
});

export default mongoose.models.Bid || mongoose.model("Bid", bidSchema);
