import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Spécifie explicitement la racine du projet pour le tracing des fichiers
  // Cela évite l'avertissement concernant plusieurs lockfiles détectés
  outputFileTracingRoot: path.join(__dirname),
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://backend:8001/api/:path*',
      },
    ];
  },
};

export default nextConfig;
