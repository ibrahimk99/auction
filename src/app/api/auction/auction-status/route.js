import connectDB from "@/app/lib/connectDB";
import auctionModel from "@/app/models/auctionModel";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const updates = await auctionModel
    .find({
      status: { $in: "ended" },
      winnerId: { $ne: null },
    })
    .populate("winnerId", "name email");
  return NextResponse.json({ success: true, data: updates });
}
