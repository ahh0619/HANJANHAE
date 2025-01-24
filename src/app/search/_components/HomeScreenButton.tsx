import Image from 'next/image';

import useModalStore from '@/store/modalStore';

const HomeScreenButton = () => {
  const { openModal } = useModalStore();

  return (
    <div className="flex w-full justify-center">
      <button
        onClick={openModal}
        className="mt-[31px] flex h-[36px] w-[157px] items-center justify-center rounded-[8px] bg-[#BF324B] px-3 py-2"
      >
        <Image
          src="/assets/icons/sliders-v-alt-white.svg"
          alt="Slider_icon"
          width={24}
          height={24}
          className="m-2 h-6 w-6"
        />
        <span className="leading-150 text-label-lm text-grayscale-100">
          스마트 서치
        </span>
      </button>
    </div>
  );
};

export default HomeScreenButton;
