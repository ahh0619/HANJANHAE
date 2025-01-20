'use client';

const Skeleton = () => {
  return (
    <div>
      <div className="mt-[12px] grid w-full grid-cols-2 justify-items-center gap-[8px]">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            className="flex w-[163px] animate-pulse flex-col rounded-lg border bg-gray-50 p-2"
            key={idx}
          >
            <div className="aspect-[4/5] w-full overflow-hidden rounded-md bg-gray-200"></div>
            <div className="mt-2 w-full">
              <div className="h-4 w-3/4 rounded bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skeleton;
