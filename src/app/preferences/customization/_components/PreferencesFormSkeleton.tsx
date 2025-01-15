const PreferencesFormSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* 1. 술 종류 선택 영역 스켈레톤 */}
      <div>
        <div className="mb-3 h-5 w-52 rounded bg-gray-200" />
        <div className="flex flex-wrap gap-2">
          {/* 대충 버튼 모양 4~5개 정도 만들기 */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-9 w-16 animate-pulse rounded-full bg-gray-200"
            />
          ))}
        </div>
      </div>

      {/* 2. 도수 선택 영역 스켈레톤 */}
      <div>
        <div className="mb-3 h-5 w-52 rounded bg-gray-200" />
        <div className="flex justify-between space-x-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-12 w-24 animate-pulse rounded bg-gray-200"
            />
          ))}
        </div>
      </div>

      {/* 3. 맛(단맛/신맛/청량감 등) 선택 영역 스켈레톤 */}
      {Array.from({ length: 4 }).map((_, index) => (
        <div className="mb-6" key={index}>
          {/* 라벨(예: "어느 정도의 단맛을 선호하시나요?") 자리 */}
          <div className="mb-3 h-5 w-64 animate-pulse rounded bg-gray-200" />
          {/* 버튼(매우 약함 ~ 매우 강함) 5개 정도를 가정 */}
          <div className="flex w-full justify-between space-x-8">
            {Array.from({ length: 5 }).map((_, subIndex) => (
              <div
                key={subIndex}
                className="h-12 w-20 animate-pulse rounded bg-gray-200"
              />
            ))}
          </div>
        </div>
      ))}

      {/* 4. 안주 입력 영역 스켈레톤 */}
      <div>
        <div className="w-53 mb-3 h-5 rounded bg-gray-200" />
        <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
      </div>

      {/* 5. 저장하기 버튼 스켈레톤 */}
      <div className="h-12 w-full animate-pulse rounded bg-gray-200" />
    </div>
  );
};

export default PreferencesFormSkeleton;
