const PreferencesFormSkeleton = () => {
  return (
    <div className="px-[19px]">
      {/* 1. 술 종류 선택 영역  */}
      <div className="mb-10 h-[130px] w-[311px] xl:w-[350px]">
        <div className="mb-[16px] h-[20px] w-[250px] animate-pulse rounded bg-gray-200 xl:h-[27px]" />
        <div className="mb-[16px] mt-[3px] hidden h-[27px] w-[150px] animate-pulse rounded bg-gray-200 xl:block" />

        <div className="flex h-[92px] flex-wrap gap-x-[16px] gap-y-[12px]">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="h-[36px] w-[54px] animate-pulse rounded-full bg-gray-200"
            />
          ))}
        </div>
      </div>

      {/* 2. 도수 선택 영역 */}
      <div className="mb-10 xl:mt-[100px]">
        <div className="mb-[16px] h-[20px] w-[150px] animate-pulse rounded bg-gray-200 xl:h-[27px]" />

        <div className="flex w-full justify-between space-x-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="h-[48px] w-[80px] animate-pulse rounded bg-gray-200" />
              <div className="h-[16px] w-[80px] animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. 맛(단맛/신맛/청량감 등) 선택 영역 스켈레톤 */}
      {Array.from({ length: 4 }).map((_, index) => (
        <div className="mb-10" key={index}>
          <div className="mb-[16px] h-[20px] w-[180px] animate-pulse rounded bg-gray-200 xl:mt-[85px] xl:h-[27px]" />

          <div className="flex w-full justify-between space-x-4">
            {Array.from({ length: 5 }).map((_, subIndex) => (
              <div
                className="flex flex-col items-center space-y-2"
                key={subIndex}
              >
                <div className="h-[40px] w-[60px] animate-pulse rounded bg-gray-200" />
                <div className="h-[12px] w-[50px] animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* 4. 안주 입력 영역 */}
      <div className="mb-[60px] mt-[50px]">
        <div className="mb-[16px] h-[40px] w-[230px] animate-pulse rounded bg-gray-200" />
        <div className="h-[48px] w-full animate-pulse rounded bg-gray-200" />
      </div>

      {/* 5. 저장하기 버튼  */}
      <div className="mb-[20px] mt-[80px] h-[54px] w-full animate-pulse rounded-[8px] bg-gray-200 xl:mt-[170px]" />
    </div>
  );
};

export default PreferencesFormSkeleton;
