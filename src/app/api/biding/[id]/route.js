import connectDB from "@/app/lib/connectDB";
import "@/app/models/auctionModel";
import "@/app/models/User";
import { NextResponse } from "next/server";
import bidModel from "@/app/models/bidModel";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const data = await bidModel
      .find({ auctionId: id })
      .populate("auctionId")
      .populate("bidderId")
      .lean();
    return NextResponse.json({
      success: true,
      message: "Bids Data Successfuly fetched",
      data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
