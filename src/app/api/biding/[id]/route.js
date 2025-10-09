import connectDB from "@/app/lib/connectDB";
import "@/app/models/auctionModel";
import "@/app/models/User";
import { NextResponse } from "next/server";
import bidModel from "@/app/models/bidModel";

export async function GET(req, { params }) {
  const { id } = await params;
  await connectDB();
  const biding = await bidModel
    .find({})
    .populate("auctionId")
    .populate("bidderId")
    .lean();
  const data = biding.filter((bid) => id == bid.auctionId._id);
  return NextResponse.json({ success: true, data });
}
