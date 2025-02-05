'use client';

import { useRouter } from 'next/navigation';

import OptimizedImage from '@/components/common/OptimizedImage';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center pt-0 xl:justify-start xl:pt-16">
      <section className="flex flex-col items-center">
        <OptimizedImage
          src="/assets/Error_Image.svg"
          alt="에러 이미지"
          width={106}
          height={124}
          className="mb-5"
        />

        <h1 className="mb-4 text-title-2xl">Page Not Found</h1>

        <p className="mb-9 flex flex-col items-center text-center text-body-mm text-grayscale-700">
          존재하지 않는 주소를 입력하셨거나
          <br />
          요청하신 페이지의 주소가
          <br />
          변경 또는 삭제되어 찾을 수 없어요.
        </p>

        <div className="flex flex-row gap-2">
          <button
            onClick={() => router.back()}
            className="h-[48px] w-[88.7px] flex-shrink-0 rounded-lg border border-primary px-4 py-3 text-label-lmb text-primary transition-colors hover:bg-primary hover:text-etc-white"
          >
            이전으로
          </button>
          <button
            onClick={() => router.push('/')}
            className="h-[48px] w-[88.7px] flex-shrink-0 rounded-lg border border-primary px-4 py-3 text-label-lmb text-primary transition-colors hover:bg-primary hover:text-etc-white"
          >
            홈으로
          </button>
        </div>
      </section>
    </div>
  );
};
export default NotFound;
