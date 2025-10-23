"use client";
import Image from "next/image";
import Header from "@/app/components/Header";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UploadButton from "@/app/components/UploadButton";
import { useDispatch } from "react-redux";
import { safeFetch } from "@/app/utils/safeFetch";

const CreateAuction = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(Date.now());
  const [status, setStatus] = useState("upcoming");
  const [images, setImages] = useState("");
  const [cloudImg, setCloudImg] = useState("");

  const getImage = (data) => {
    setImages(data.info.secure_url);
    setCloudImg(data.info.public_id);
  };

  const delImg = async (id) => {
    const data = await safeFetch(
      `/api/cloudinary/${id}`,
      dispatch,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      },
      Date.now()
    );
    if (data) {
      setImages("");
    }
  };

  const handleSubmitForm = async () => {
    const data = await safeFetch(
      "/api/auction",
      dispatch,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          startingPrice,
          images,
          status,
          currentPrice,
          startTime,
          endTime,
          cloudImg,
          sellerId: session?.user.id,
        }),
      },
      Date.now(),
      null
    );
    if (data) {
      router.push("/dashboard");
    }
  };
  if (!session)
    return (
      <div className="container text-center mt-5">
        <p className="alert alert-danger">
          You have no access to create auction
        </p>
        <Link href="/user-auth" className="btn btn-primary">
          Login
        </Link>
      </div>
    );
  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow p-4" style={{ width: "420px" }}>
          <h4 className="text-center mb-3">Create Auction</h4>

          <div className="mb-2">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-2">
            {images && (
              <div className=" mb-2">
                <span
                  onClick={() => delImg(cloudImg)}
                  className="position-absolute badge round-pill bg-danger"
                  style={{ cursor: "pointer" }}
                >
                  X
                </span>

                <Image
                  src={images}
                  alt="Uploaded"
                  className="img-thumbnail"
                  width={80}
                  height={80}
                  objectFit="cover"
                  priority
                />
              </div>
            )}

            <label className="form-label">Image</label>

            <input
              type="text"
              className="form-control form-control-sm mb-1"
              value={images}
              onChange={(e) => setImages(e.target.value)}
            />
            <UploadButton getImage={getImage} />
          </div>

          <div className="mb-2">
            <label className="form-label">Start Price</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={startingPrice}
              onChange={(e) => setStartingPrice(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Current Price</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={currentPrice}
              onChange={(e) => setCurrentPrice(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Start Time</label>
            <input
              type="datetime-local"
              className="form-control form-control-sm"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label className="form-label">End Time</label>
            <input
              type="datetime-local"
              className="form-control form-control-sm"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select form-select-sm"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="upcoming">Up-Coming</option>
              <option value="active">Active</option>
              <option value="ended">Ended</option>
            </select>
          </div>

          <div className="text-center">
            <button
              onClick={handleSubmitForm}
              className="btn btn-success btn-sm w-100"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAuction;
