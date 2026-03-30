import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    qualities: [75, 80, 85, 90],
  },
  redirects: async () => [
    {
      source: '/main-board/analyser/sammenligning-2024',
      destination: '/main-board/analyser/sammenligning/2024',
      permanent: true,
    },
    {
      source: '/main-board/analyser/sammenligning-2025',
      destination: '/main-board/analyser/sammenligning/2025',
      permanent: true,
    },
  ],
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
  ],
};

export default nextConfig;
