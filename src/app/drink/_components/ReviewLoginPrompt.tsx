'use client';

import { LogIn } from 'lucide-react';

export type ReviewLoginPromptProps = {
  onLoginClick: () => void;
};

const ReviewLoginPrompt = ({ onLoginClick }: ReviewLoginPromptProps) => {
  return (
    <div className="mt-4 space-y-4">
      {/* Login Prompt Section */}
      <div className="relative h-24 rounded-xl bg-gray-100 p-4">
        <p className="text-left text-sm text-gray-600">
          리뷰 등록은 로그인 후 가능합니다.
        </p>

        {/* Login Button */}
        <button
          onClick={onLoginClick}
          className="absolute bottom-3 right-4 flex items-center space-x-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
        >
          <LogIn className="h-5 w-5" />
          <span>로그인하러 가기</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewLoginPrompt;
