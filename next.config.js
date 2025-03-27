/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  transpilePackages: ['next-themes'],
  typescript: {
    // Bỏ qua lỗi TypeScript trong quá trình build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Bỏ qua lỗi ESLint trong quá trình build
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig;