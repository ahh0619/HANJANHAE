import OptimizedImage from '@/components/common/OptimizedImage';

type StandBySCreenProps = {
  className?: string;
};

const StandByScreen: React.FC<StandBySCreenProps> = ({ className }) => {
  return (
    <div
      className={`bg-gray mt-[76px] flex flex-col items-center xl:mt-[100px] ${className}`}
    >
      <OptimizedImage
        src="/assets/icons/Character_search.svg"
        alt="전통주 캐릭터 이미지"
        width={131}
        height={206}
        className="h-[206px] w-[131px]"
      />
      {/* 간격이 조금 어긋난 바텀에서 77 떨어지게 해야되는데 */}
      <p className="mt-[36px] flex justify-center text-title-mb font-bold leading-[1.35] text-grayscale-500">
        궁금한 전통주를 검색해보세요
      </p>
    </div>
  );
};

export default StandByScreen;
