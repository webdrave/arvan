import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images :  {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // '**' is a glob pattern to match any path under /v/
      },
    ]
  }
  /* config options here */
};

export default nextConfig;
