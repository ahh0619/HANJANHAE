import OptimizedImage from '@/components/common/OptimizedImage';
import useModalStore from '@/store/modalStore';

type HomeScreenButtonProps = {
  className?: string;
};

const HomeScreenButton: React.FC<HomeScreenButtonProps> = ({className}) => {
  const { openModal } = useModalStore();

  return (
    <div className={`flex w-full justify-center xl:w-auto ${className}`}>
      <button
        onClick={openModal}
        className="mt-[31px] flex h-[36px] w-[157px] items-center justify-center gap-2 rounded-[8px] bg-[#BF324B] px-3 py-2 xl:mt-[0]"
      >
        <OptimizedImage
          src="/assets/icons/sliders-v-alt-white.svg"
          alt="검색 필터 아이콘"
        />
        <span className="leading-150 text-label-mb text-grayscale-100">
          스마트 서치
        </span>
      </button>
    </div>
  );
};

export default HomeScreenButton;
