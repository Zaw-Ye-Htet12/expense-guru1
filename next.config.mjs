/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: ["avatars.githubusercontent.com", "cloudflare-ipfs.com"],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
