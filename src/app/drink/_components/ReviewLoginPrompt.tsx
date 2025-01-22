'use client';

import OptimizedImage from '@/components/common/OptimizedImage';

export type ReviewLoginPromptProps = {
  onLoginClick: () => void;
};

const ReviewLoginPrompt = ({ onLoginClick }: ReviewLoginPromptProps) => {
  return (
    <div className="mt-4 space-y-4">
      {/* Login Prompt Section */}
      <div className="relative h-[125px] rounded-2xl bg-grayscale-100 p-4">
        <p className="!mt-[10px] pr-[10px] text-center text-body-mm text-grayscale-600">
          리뷰 등록은 로그인 후 가능해요.
        </p>

        {/* Login Button */}
        <button
          onClick={onLoginClick}
          className="absolute bottom-5 right-4 flex items-center space-x-1 rounded-lg bg-primary px-4 py-2 text-label-mb text-grayscale-100 hover:bg-primary-hover"
        >
          <OptimizedImage
            src="/assets/icons/login.svg"
            alt="로그인 아이콘"
            width={18}
            height={18}
          />
          <span>로그인하러 가기</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewLoginPrompt;
