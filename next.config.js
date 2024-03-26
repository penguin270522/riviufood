/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns: ["localhost", "http://127.0.0.1:8000/", "127.0.0.1"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
