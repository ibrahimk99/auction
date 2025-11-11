import { CronJob } from "cron";
import connectDB from "../lib/connectDB.js";
import bidModel from "../models/bidModel.js";
import auctionModel from "../models/auctionModel.js";
import User from "../models/User.js";

await connectDB();

const job = new CronJob("*/30 * * * * *", async () => {
  try {
    const now = new Date();
    const auctions = await auctionModel.find({ status: { $ne: "ended" } });

    for (const auction of auctions) {
      const start = new Date(auction.startTime);
      const end = new Date(auction.endTime);

      if (now < start) {
        if (auction.status !== "upcoming") {
          auction.status = "upcoming";
          await auction.save();
        }
      } else if (now >= start && now < end) {
        if (auction.status !== "running") {
          auction.status = "running";
          await auction.save();
        }
      } else if (now >= end && auction.status !== "ended") {
        const highestBid = await bidModel
          .findOne({ auctionId: auction._id })
          .sort({ amount: -1 })
          .populate("bidderId");

        if (highestBid) {
          auction.winnerId = highestBid.bidderId._id;
          auction.finalPrice = highestBid.amount;
        }
        auction.status = "ended";
        await auction.save();
      }
    }
  } catch (error) {
    console.error("⚠️ Cron job error:", error);
  }
});

job.start();
console.log("✅ Auction cron job started...");
