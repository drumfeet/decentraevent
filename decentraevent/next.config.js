/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  },
}

module.exports = nextConfig
