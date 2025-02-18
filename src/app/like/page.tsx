import LikesContent from './_components/LikesContent';

const Page = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center px-5">
      <div className="mb-[32px] flex h-[44px] w-full items-center justify-center px-2 xl:hidden">
        <h1 className="text-title-xl leading-[44px]">좋아요</h1>
      </div>
      <LikesContent />
    </div>
  );
};

export default Page;
