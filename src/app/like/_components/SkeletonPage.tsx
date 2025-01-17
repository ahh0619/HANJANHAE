const SkeletonPage = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 justify-items-center gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            className="relative flex w-48 animate-pulse flex-col rounded-lg border bg-gray-50 p-2"
            key={idx}
          >
            {/* 이미지 자리 */}
            <div className="aspect-[4/5] w-full overflow-hidden bg-gray-200"></div>
            {/* 이름 자리 */}
            <div className="mt-2 w-full text-left text-xs">
              <div className="h-4 w-3/4 rounded bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonPage;
