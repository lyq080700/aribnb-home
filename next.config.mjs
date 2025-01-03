/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "z1.muscache.cn",
      },
    ],
  },
};

export default nextConfig;
