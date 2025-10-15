import { NextResponse } from "next/server";
import User from "@/app/models/User";
import connectDB from "@/app/lib/connectDB";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password, name, role } = await req.json();
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({
        success: false,
        message: "User already exists",
      });
    }
    const user = new User({ email, name, role, password });
    await user.save();
    return NextResponse.json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
