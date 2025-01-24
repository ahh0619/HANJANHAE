'use client';

import { AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

type ErrorComponentProps = {
  reset: () => void;
};

const ErrorComponent = ({ reset }: ErrorComponentProps) => {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <section className="flex flex-col items-center gap-10">
        {/* Error Marker */}
        <div className="flex flex-col items-center gap-4 text-center text-gray-700">
          <AlertTriangle className="h-12 w-12 text-red-600" />
          <p className="text-[40px] font-black">Error</p>
          <p className="flex flex-col items-center text-body-mm">
            <span>
              화면을 불러올 수 없어요.
              <br />
            </span>
            <span>잠시 후 다시 시도해 주세요!</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex w-full max-w-lg items-center justify-center gap-4 px-4 py-5">
          {/* "다시 시도하기" 버튼 */}
          <button
            onClick={() => reset()}
            className="whitespace-nowrap rounded bg-secondary-200 px-6 py-2 font-medium text-white hover:bg-secondary-200"
          >
            다시 시도
          </button>

          {/* "홈으로" 버튼 */}
          <button
            onClick={() => router.push('/')}
            className="whitespace-nowrap rounded bg-primary px-6 py-2 font-medium text-white hover:bg-primary-hover"
          >
            홈으로
          </button>
        </div>
      </section>
    </div>
  );
};

export default ErrorComponent;
