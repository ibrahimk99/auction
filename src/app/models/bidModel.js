import mongoose from "mongoose";
const Schema = mongoose.Schema;
const bidSchema = new Schema({
  auctionId: {
    type: Schema.Types.ObjectId,
    ref: "Auction",
  },
  bidderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  amount: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Bid || mongoose.model("Bid", bidSchema);
