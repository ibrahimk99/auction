import { NextResponse } from "next/server";
import cloudinary from "@/app/lib/cloudinary";
export async function DELETE(req, { params }) {
  try {
    const { imgId } = await params;
    const result = await cloudinary.uploader.destroy(imgId);

    if (result.result !== "ok") {
      return NextResponse.json({ success: false, message: "Failed to delete" });
    }
    return NextResponse.json({
      success: true,
      message: "Image Deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
