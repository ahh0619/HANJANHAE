const FoodPairingSkeleton = () => {
  return (
    <div className="p-4">
      {/* 제목 자리 표시자 */}
      <div className="mb-4 animate-pulse">
        <h3 className="text-lg font-bold">추천 페어링 음식</h3>
      </div>

      {/* 음식 카드 자리 표시자 */}
      <div className="grid grid-cols-3 justify-items-center gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex animate-pulse flex-col items-center justify-center space-y-2"
          >
            {/* 원형 이미지 자리 표시자 */}
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-300" />
            {/* 텍스트 자리 표시자 */}
            <div className="h-4 w-16 rounded bg-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodPairingSkeleton;
