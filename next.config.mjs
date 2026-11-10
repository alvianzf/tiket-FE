/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "117.102.64.238",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  async redirects() {
    return [
      // Ferry is now the home page (Batam/MY/SG concierge focus) - the old
      // /ferry route would otherwise duplicate it under a second URL.
      { source: "/ferry", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
