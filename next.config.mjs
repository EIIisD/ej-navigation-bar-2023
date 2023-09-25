/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React's strict mode to highlight potential problems in an application
  reactStrictMode: true,

  // Specify the domains from which images can be loaded
  images: {
    domains: ["www.easyjet.com"],
  },
}

export default nextConfig
