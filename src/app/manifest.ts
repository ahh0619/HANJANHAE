import type { MetadataRoute } from 'next';

export const manifest = (): MetadataRoute.Manifest => {
  return {
    name: '한잔해',
    short_name: 'HANJANHAE',
    description: 'AI 추천 기반 전통주를 만나보세요!',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
};
