import Image from 'next/image';

const StandByScreen = () => {
  return (
    <div className="bg-gray mt-[76px] flex flex-col items-center">
      <Image
        src="/assets/icons/Character_search.svg"
        alt="Searcn_Image"
        width={131}
        height={206}
        className="h-[206px] w-[131px]"
      />
      {/* 간격이 조금 어긋난 바텀에서 77 떨어지게 해야되는데 */}
      <p className="--font-title-mb absolute bottom-[calc(77px+3rem)] left-0 right-0 mt-[36px] flex justify-center font-bold leading-[1.35] text-grayscale-500">
        궁금한 전통주를 검색해보세요
      </p>
    </div>
  );
};

export default StandByScreen;
