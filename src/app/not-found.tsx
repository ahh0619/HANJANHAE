'use client';

import { AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <section className="flex flex-col items-center gap-10">
        <AlertTriangle className="h-12 w-12 text-red-600" />
        <div className="flex flex-col items-center gap-4 font-black text-gray-700">
          <p className="text-[40px]">Page Not Found</p>
          <p className="flex flex-col items-center text-body-mm">
            <span>
              존재하지 않는 주소를 입력하셨거나
              <br />
            </span>
            <span>
              요청하신 페이지의 주소가 변경
              <br />
            </span>
            <span>또는 삭제되어 찾을 수 없어요.</span>
          </p>
        </div>

        <div className="flex w-full max-w-md flex-row gap-4 px-4 py-5">
          <button
            onClick={() => router.back()}
            className="flex-1 rounded bg-secondary-200 px-4 py-2 font-medium text-white hover:bg-secondary-300"
          >
            이전으로
          </button>

          {/* 홈으로 버튼 */}
          <button
            onClick={() => router.push('/')}
            className="flex-1 rounded bg-primary px-4 py-2 font-medium text-white hover:bg-primary-hover"
          >
            홈으로
          </button>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
