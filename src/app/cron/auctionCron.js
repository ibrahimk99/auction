import { CronJob } from "cron";
import connectDB from "../lib/connectDB.js";
import bidModel from "../models/bidModel.js";
import auctionModel from "../models/auctionModel.js";
import User from "../models/User.js";
await connectDB();

function formatDuration(ms) {
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const seconds = Math.floor((ms / 1000) % 60);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

const job = new CronJob("*/10 * * * * *", async () => {
  // console.log("⏰ Checking auctions...");
  const now = new Date();
  const auctions = await auctionModel.find({
    status: { $ne: "ended" },
  });

  for (const auction of auctions) {
    const start = new Date(auction.startTime);
    const end = new Date(auction.endTime);
    const timeUntilStart = start - now;
    const timeUntilEnd = end - now;

    if (timeUntilStart > 0) {
      // const readable = formatDuration(timeUntilStart);
      // console.log(`🕐 Auction "${auction.title}" starts in ${readable}`);

      if (auction.status !== "upcoming") {
        auction.status = "upcoming";
        await auction.save();
      }
    } else if (timeUntilStart <= 0 && timeUntilEnd > 0) {
      // const readable = formatDuration(timeUntilEnd);

      if (auction.status !== "active") {
        auction.status = "active";
        await auction.save();

        // const users = await User.find();
        // users.forEach((user) => {
        //   console.log(
        //     `📢 Notify ${user.name}: Auction "${auction.title}" has started! 🕒`
        //   );
        // });
      }

      // console.log(`🏁 Auction "${auction.title}" Active — ${readable} left`);
    } else if (timeUntilEnd <= 0 && auction.status !== "ended") {
      // console.log(`🛑 Auction "${auction.title}" ended — processing bids...`);

      const highestBid = await bidModel
        .findOne({ auctionId: auction._id })
        .sort({ amount: -1 })
        .populate("bidderId");

      if (highestBid) {
        auction.winnerId = highestBid.bidderId._id;
        auction.finalPrice = highestBid.amount;
      }
      //   console.log(
      //     `🏆 "${auction.title}" won by ${highestBid.bidderId.name} for $${highestBid.amount}`
      //   );
      //   console.log(
      //     `📩 Notify ${highestBid.bidderId.name}: You won the auction "${auction.title}" for $${highestBid.amount}! 🎉`
      //   );
      // } else {
      //   console.log(`⚠️ "${auction.title}" ended with no bids.`);
      // }
      auction.status = "ended";
      await auction.save();
    }
  }
});

job.start();
console.log("✅ Auction cron job running");
