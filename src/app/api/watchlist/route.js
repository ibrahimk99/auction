import connectDB from "@/app/lib/connectDB";
import { NextResponse } from "next/server";
import WatchList from "@/app/models/WatchList";

export async function POST(req) {
  try {
    const { user, auctions } = await req.json();
    await connectDB();
    const updatedWatchlist = await WatchList.updateOne(
      { user },
      { $addToSet: { auctions } },
      { upsert: true }
    );
    return NextResponse.json({
      success: true,
      message: "Added to watchlist successfully",
      data: updatedWatchlist,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}
