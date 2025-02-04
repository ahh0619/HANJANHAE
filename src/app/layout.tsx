import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';

import BottomNavBar from '@/components/common/BottomNavBar';
import KakaoInit from '@/components/common/KakaoInit';
import ScrollTop from '@/components/common/ScrollTop';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import '@/styles/globals.css';

import { Providers } from './providers';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
  preload: true,
});

export const metadata: Metadata = {
  title: '한잔해',
  description: 'AI 추천 기반 전통주를 만나보세요!',
  icons: {
    icon: '/assets/icons/favicon.svg',
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
    <html lang="ko">
      <head>
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.min.js"
          strategy="lazyOnload"
        />
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`}
          strategy="beforeInteractive"
        />
        <Script src="/service-worker.js" />
      </head>
      <body
        className={`${pretendard.variable} font-sans text-grayscale-900 antialiased xl:flex xl:h-screen xl:flex-col`}
      >
        <Providers>
          <KakaoInit />
          <Header />
          <main className="m-auto mb-32 w-full max-w-[600px] xl:mt-[102px] xl:max-w-none xl:flex-1">
            {children}
          </main>
          <Footer />
          <ScrollTop />
          <BottomNavBar />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
