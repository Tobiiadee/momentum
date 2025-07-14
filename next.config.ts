// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "sszfkjhhhrlgppwepmlv.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};