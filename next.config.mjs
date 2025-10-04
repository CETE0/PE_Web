/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    // Solo usar unoptimized en desarrollo, no en producción
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Remover output: 'export' para permitir APIs
  // output: 'export', // Comentado para que funcionen las APIs
  eslint: {
    // Desactivar ESLint durante la construcción hasta solucionar el conflicto de versiones
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
