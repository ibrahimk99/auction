"use client";
import { CldUploadButton } from "next-cloudinary";
export default function UploadButton({ getImage }) {
  return (
    <CldUploadButton
      className="btn btn-sm btn-primary"
      uploadPreset="next_uploads"
      onSuccess={(result) => {
        getImage(result);
      }}
    >
      Upload Image
    </CldUploadButton>
  );
}
