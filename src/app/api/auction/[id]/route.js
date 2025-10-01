import connectDB from "@/app/lib/connectDB";
import auctionModel from "@/app/models/auctionModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;
  await connectDB();
  const data = await auctionModel.find({ _id: id });
  return NextResponse.json({ success: true, data });
}
