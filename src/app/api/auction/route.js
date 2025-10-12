import connectDB from "@/app/lib/connectDB";
import auctionModel from "@/app/models/auctionModel";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";

export async function GET() {
  await connectDB();
  const data = await auctionModel.find({});
  return NextResponse.json({ success: true, data });
}
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }
  const payload = await req.json();
  await connectDB();
  const data = await auctionModel.create(payload);
  return NextResponse.json({ succes: true, data });
}
