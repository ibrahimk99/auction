import connectDB from "@/app/lib/connectDB";
import auctionModel from "@/app/models/auctionModel";
import { NextResponse } from "next/server";
import cloudinary from "@/app/lib/cloudinary";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const data = await auctionModel.find({ _id: id });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch data",
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const auction = await auctionModel.findById(id);
    const publicId = auction.cloudImg;
    await cloudinary.uploader.destroy(publicId);
    await auctionModel.deleteOne({ _id: id });
    return NextResponse.json({
      success: true,
      message: "Auction Deleted Successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to delete auction",
    });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const data = await req.json();

    await connectDB();
    await auctionModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return NextResponse.json({
      success: true,
      message: "Auction Updated",
      data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const data = await req.json();

    await connectDB();
    await auctionModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return NextResponse.json({
      success: true,
      message: "Bid Added Successfuly",
      data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
