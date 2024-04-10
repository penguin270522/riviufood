/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/",
        destination: "http://26.177.67.186:8080/", // Thay đổi địa chỉ IP và cổng của backend của bạn tại đây
      },
    ];
  },
};
module.exports = nextConfig;
