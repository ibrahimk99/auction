import connectDB from "@/app/lib/connectDB";
import auctionModel from "@/app/models/auctionModel";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  await connectDB();
  const data = await auctionModel.find({ sellerId: session.user.id });
  return NextResponse.json({ success: true, data });
}
