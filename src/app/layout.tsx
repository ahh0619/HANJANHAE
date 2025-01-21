import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';

import BottomNavBar from '@/components/common/BottomNavBar';
import KakaoInit from '@/components/common/KakaoInit';
import ScrollTop from '@/components/common/ScrollTop';
import { AuthProvider } from '@/providers/AuthProvider';
import Providers from '@/providers/Provider';

import '@/styles/globals.css';

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
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`}
          strategy="beforeInteractive"
        />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <Providers>
            <KakaoInit />
            <main className="m-auto mb-32">{children}</main>
            <ScrollTop />
            <BottomNavBar />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
