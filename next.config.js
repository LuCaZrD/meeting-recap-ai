/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Đảm bảo ứng dụng hoạt động đúng trong thư mục con trên Cloudflare Pages nếu cần
  basePath: '',
  // Disable the use of React Strict Mode for production builds
  reactStrictMode: process.env.NODE_ENV === 'development',
  experimental: {
    // appDir đã được loại bỏ từ Next.js 13+
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig; 