import connectDB from "@/app/lib/connectDB";
import { NextResponse } from "next/server";
import WatchList from "@/app/models/WatchList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import auctionModel from "@/app/models/auctionModel";

export async function GET(req, { params }) {
  const { userId } = await params;
  await connectDB();
  const data = await WatchList.findOne({ user: userId })
    .populate("user")
    .populate("auctions")
    .lean();
  return NextResponse.json({
    success: true,
    message: "WatchList fetched successfully",
    data,
  });
}

export async function DELETE(req, { params }) {
  const { userId } = await params;
  const session = await getServerSession(authOptions);

  await connectDB();
  const data = await WatchList.findOneAndUpdate(
    { user: session.user.id },
    { $pull: { auctions: userId } },
    { new: true }
  );

  return NextResponse.json({
    success: true,
    message: "Auction removed from WatchList",
    data,
  });
}
