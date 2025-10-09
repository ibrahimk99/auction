import connectDB from "@/app/lib/connectDB";
import "@/app/models/auctionModel";
import "@/app/models/User";
import { NextResponse } from "next/server";
import bidModel from "@/app/models/bidModel";

export async function POST(req) {
  const data = await req.json();
  await connectDB();
  const newBid = new bidModel(data);
  await newBid.save();
  return NextResponse.json({ success: true, data });
}
