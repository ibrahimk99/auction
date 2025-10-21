import connectDB from "@/app/lib/connectDB";
import { NextResponse } from "next/server";
import WatchList from "@/app/models/WatchList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  await connectDB();
  await WatchList.deleteMany({ user: session.user.id });
  return NextResponse.json({
    success: true,
    message: "All Auctions removed from WatchList ",
  });
}
