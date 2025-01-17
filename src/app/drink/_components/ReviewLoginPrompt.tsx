'use client';

import { LogIn } from 'lucide-react';

export type ReviewLoginPromptProps = {
  onLoginClick: () => void;
};

const ReviewLoginPrompt = ({ onLoginClick }: ReviewLoginPromptProps) => {
  return (
    <div className="mt-4 space-y-4">
      {/* Login Prompt Section */}
      <div className="relative h-32 rounded-xl bg-grayscale-100 p-4">
        <p className="!mt-4 text-center text-body-mm text-grayscale-600">
          리뷰 등록은 로그인 후 가능해요.
        </p>

        {/* Login Button */}
        <button
          onClick={onLoginClick}
          className="absolute bottom-5 right-4 flex items-center space-x-2 rounded-lg bg-primary px-4 py-2 text-label-mb text-grayscale-100 hover:bg-primary-hover"
        >
          <LogIn className="h-4 w-4" />
          <span>로그인하러 가기</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewLoginPrompt;
