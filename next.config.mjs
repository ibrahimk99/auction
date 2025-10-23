/** @type {import('next').NextConfig} */
import "./src/app/cron/auctionCron.js";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
