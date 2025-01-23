'use client';

const Skeleton = () => {
  return (
    <div className="mx-[56px] mt-[56px] grid w-full max-w-[448px] grid-cols-2 justify-items-center gap-[8px]">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          className="flex w-[100%] animate-pulse flex-col rounded-lg border bg-gray-50 p-2"
          key={idx}
        >
          <div className="aspect-[4/5] w-full overflow-hidden rounded-md bg-gray-200"></div>
          <div className="mt-2 w-full">
            <div className="h-4 w-3/4 rounded bg-gray-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
