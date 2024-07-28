/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // protocol: 'https',
        hostname: 'files.edgestore.dev',
        port: '',
        pathname: '/gd81t19bf1hwl287/publicFiles/_public/**',
      },
    ],
  },
};

export default nextConfig;
