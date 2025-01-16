'use client';

import { LogIn, Star } from 'lucide-react';

export type ReviewLoginPromptProps = {
  onLoginClick: () => void;
};

const ReviewLoginPrompt = ({ onLoginClick }: ReviewLoginPromptProps) => {
  return (
    <div className="mt-4 space-y-4">
      {/* Star Rating Section */}
      <div className="flex space-x-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="h-6 w-6 text-yellow-400" />
        ))}
      </div>

      {/* Login Prompt Section */}
      <div className="relative flex h-32 items-start justify-start rounded-xl border border-gray-400 bg-gray-200 p-4">
        <p className="text-left text-sm text-gray-600">
          리뷰 등록은 로그인 후 가능합니다.
        </p>
      </div>

      {/* Login Button */}
      <div className="flex justify-end">
        <button
          onClick={onLoginClick}
          className="text-semibold flex items-center space-x-2 rounded-lg bg-primary px-4 py-2 text-sm text-white hover:bg-primary-hover"
        >
          <LogIn className="h-5 w-5" />
          <span>로그인하러 가기</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewLoginPrompt;
