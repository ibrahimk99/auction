import { NextResponse } from "next/server";
import cloudinary from "@/app/lib/cloudinary";
export async function DELETE(req, { params }) {
  try {
    const { imgId } = await params;
    const result = await cloudinary.uploader.destroy(imgId);

    if (result.result !== "ok") {
      return NextResponse.json(
        { success: false, message: "Failed to delete" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
