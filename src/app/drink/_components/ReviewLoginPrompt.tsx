'use client';

export type ReviewLoginPromptProps = {
  onLoginClick: () => void;
};

const ReviewLoginPrompt = ({ onLoginClick }: ReviewLoginPromptProps) => {
  return (
    <div className="mt-4 space-y-6 rounded-lg border p-4">
      <div className="relative h-32">
        <textarea
          id="comment"
          className="absolute inset-0 h-full w-full resize-none rounded-lg border border-gray-300 bg-gray-100 p-3 text-center text-sm text-gray-500 focus:outline-none"
          value="리뷰는 로그인을 해야 작성이 가능합니다."
          readOnly
        ></textarea>
      </div>
      <button
        onClick={onLoginClick}
        className="w-full rounded-lg bg-gray-800 py-2 text-sm text-white hover:bg-gray-700"
      >
        로그인 하러 가기
      </button>
    </div>
  );
};

export default ReviewLoginPrompt;
