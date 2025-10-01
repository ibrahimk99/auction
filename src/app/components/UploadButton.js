"use client";
import { CldUploadButton } from "next-cloudinary";
export default function UploadButton({ getImage }) {
  return (
    <CldUploadButton
      className="btn btn-sm btn-primary"
      uploadPreset="next_uploads" // 👈 your preset name
      onSuccess={(result) => {
        getImage(result.info.secure_url);
      }}
    >
      Upload Image
    </CldUploadButton>
  );
}
