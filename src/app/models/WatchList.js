import mongoose from "mongoose";
const Schema = mongoose.Schema;

const WatchListSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  auctions: [{ type: Schema.Types.ObjectId, ref: "Auction" }],
});

export default mongoose.models.WatchList ||
  mongoose.model("WatchList", WatchListSchema);
