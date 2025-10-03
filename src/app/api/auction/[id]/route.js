import connectDB from "@/app/lib/connectDB";
import auctionModel from "@/app/models/auctionModel";
import { NextResponse } from "next/server";
import cloudinary from "@/app/lib/cloudinary";

export async function GET(req, { params }) {
  const { id } = await params;
  await connectDB();
  const data = await auctionModel.find({ _id: id });
  return NextResponse.json({ success: true, data });
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  await connectDB();
  const auction = await auctionModel.findById(id);
  const publicId = auction.cloudImg;
  await cloudinary.uploader.destroy(publicId);
  await auctionModel.deleteOne({ _id: id });
  return NextResponse.json({ success: true });
}

export async function PUT(req, { params }) {
  const { id } = await params;

  const {
    title,
    description,
    startingPrice,
    currentPrice,
    startTime,
    endTime,
    status,
    images,
    cloudImg,
  } = await req.json();
  await connectDB();
  const data = await auctionModel.updateOne(
    { _id: id },
    {
      title,
      description,
      startingPrice,
      currentPrice,
      startTime,
      endTime,
      status,
      images,
      cloudImg,
    }
  );
  return NextResponse.json({ success: true, data });
}
