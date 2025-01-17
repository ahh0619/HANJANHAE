import LikesContent from './_components/LikesContent';

const Page = () => {
  return (
    <div>
      <div className="mb-[32px] flex h-[44px] w-full items-center justify-center px-2">
        <h1 className="h-[32px] text-center text-title-xl">좋아요</h1>
      </div>
      <LikesContent />
    </div>
  );
};

export default Page;
