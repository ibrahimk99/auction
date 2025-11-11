// import { NextResponse } from "next/server";
// import User from "@/app/models/User";
// import connectDB from "@/app/lib/connectDB";

// export async function POST(req) {
//   try {
//     await connectDB();
//     const { email, password, name, role } = await req.json();
//     const existing = await User.findOne({ email });
//     if (existing) {
//       return NextResponse.json({
//         success: false,
//         message: "User already exists",
//       });
//     }
//     const user = new User({ email, name, role, password });
//     await user.save();
//     return NextResponse.json({
//       success: true,
//       message: "User registered successfully",
//     });
//   } catch (error) {
//     return NextResponse.json({ success: false, message: error.message });
//   }
// }

import { NextResponse } from "next/server";
import User from "@/app/models/User";
import connectDB from "@/app/lib/connectDB";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password, name, role } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 409 }
      );
    }

    const user = new User({ email, name, role, password });
    await user.save();

    return NextResponse.json(
      { success: true, message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 409 }
      );
    }

    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Try again later." },
      { status: 500 }
    );
  }
}
