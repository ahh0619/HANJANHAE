const ReviewSkeleton = () => {
  return (
    <div className="mt-6 space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse space-y-4 rounded-lg border p-4 shadow-sm"
        >
          {/* 프로필과 닉네임, 날짜 */}
          <div className="flex space-x-4">
            <div className="h-12 w-12 rounded-full bg-gray-300"></div>
            <div className="flex-1">
              {/* 닉네임과 날짜 */}
              <div className="flex items-center justify-between">
                <div className="h-4 w-20 rounded bg-gray-300"></div>
                <div className="h-4 w-16 rounded bg-gray-300"></div>
              </div>
              {/* 별점 */}
              <div className="mt-1 h-4 w-28 rounded bg-gray-300"></div>
            </div>
          </div>

          {/* 댓글 */}
          <div className="mt-4 h-6 w-full rounded bg-gray-300"></div>
        </div>
      ))}
    </div>
  );
};

export default ReviewSkeleton;
