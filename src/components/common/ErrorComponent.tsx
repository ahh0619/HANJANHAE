'use client';

import { useRouter } from 'next/navigation';

import OptimizedImage from './OptimizedImage';

type ErrorComponentProps = {
  reset: () => void;
  title?: string;
  message?: string;
  showBackButton?: boolean;
  showHomeButton?: boolean;
  showSurveyButton?: boolean;
};

const ErrorComponent = ({
  reset,
  title = 'Error',
  message = '화면을 불러올 수 없어요.\n잠시 후 다시 시도해 주세요!',
  showBackButton = true,
  showHomeButton = true,
  showSurveyButton = false,
}: ErrorComponentProps) => {
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

        {/* title 값이 있으면 h1을 표시, 없으면 숨김 */}
        {title && <h1 className="mb-4 text-title-2xl">{title}</h1>}

        <div className="mb-9 flex flex-col items-center text-center text-body-mm text-grayscale-700">
          {message.split('\n').map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>

        {/* 버튼 영역 */}
        <div className="flex flex-row gap-2">
          {/* "이전으로" 버튼 */}
          {showBackButton && (
            <button
              onClick={reset}
              className="h-[48px] w-[92px] flex-shrink-0 rounded-lg border border-primary px-4 py-3 text-label-lmb text-primary transition-colors hover:bg-primary hover:text-etc-white"
            >
              이전으로
            </button>
          )}

          {/* "홈으로" 버튼 */}
          {showHomeButton && (
            <button
              onClick={() => router.push('/')}
              className="h-[48px] w-[92px] flex-shrink-0 rounded-lg border border-primary px-4 py-3 text-label-lmb text-primary transition-colors hover:bg-primary hover:text-etc-white"
            >
              홈으로
            </button>
          )}

          {/* "설문조사 하러가기" 버튼 (옵션) */}
          {showSurveyButton && (
            <button
              onClick={() => router.push('/survey')}
              className="h-[48px] w-[192px] flex-shrink-0 rounded-lg border border-primary px-4 py-3 text-center text-label-lmb text-primary transition-colors hover:bg-primary hover:text-etc-white"
            >
              설문조사 하러가기
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default ErrorComponent;
