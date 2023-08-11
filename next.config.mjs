/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    // scrollRestoration: true,
  },
  images: {
    domains: ["www.easyjet.com"],
  },
}

export default nextConfig
