'use client';

const Skeleton = () => {
  return (
    <div className="mx-auto grid max-w-screen-lg grid-cols-2 gap-4 px-4">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="relative w-full rounded-lg border border-gray-200 bg-white p-4 shadow-md"
        >
          {/* 이미지 스켈레톤 */}
          <div
            className="mb-2 w-full rounded-lg bg-gray-300"
            style={{ height: '160px', width: '128px' }} // 고정된 높이 설정
          ></div>

          {/* 텍스트 스켈레톤 */}
          <div className="mb-2 h-4 w-3/4 rounded bg-gray-300"></div>
          <div className="h-4 w-1/2 rounded bg-gray-300"></div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
