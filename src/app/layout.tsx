import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';

import BottomNavBar from '@/components/common/BottomNavBar';
import KakaoInit from '@/components/common/KakaoInit';
import ScrollTop from '@/components/common/ScrollTop';

import '@/styles/globals.css';
import { Providers } from './providers';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '한잔해',
  description: 'AI 추천 기반 전통주를 만나보세요!',
  icons: {
    icon: 'assets/icons/favicon.svg',
  },
  openGraph: {
    title: '한잔해',
    description: 'AI 추천 기반 전통주를 만나보세요!',
    images: [
      {
        url: '/assets/thumbnail.png',
        width: 1086,
        height: 360,
        alt: '한잔해 썸네일',
      },
    ],
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className={`${pretendard.variable} font-sans`}>
      <head>
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.min.js"
          strategy="lazyOnload"
        />
      </head>
      <body className="antialiased">
        <Providers>
          <KakaoInit />
          <main className="m-auto mb-32 max-w-[600px]">{children}</main>
          <ScrollTop />
          <BottomNavBar />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
