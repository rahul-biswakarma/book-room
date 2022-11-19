/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "storage.googleapis.com",
      "covers.openlibrary.org",
      "www.arlanandrews.com",
    ],
  },
};

module.exports = nextConfig;
