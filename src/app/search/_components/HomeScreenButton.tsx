import Image from 'next/image';

import useModalStore from '@/store/modalStore';

const HomeScreenButton = () => {
  const { openModal } = useModalStore();

  return (
    <div className="flex w-full justify-center">
      <button
        onClick={openModal}
        className="mt-[31px] flex w-full items-center justify-center rounded-[28px] bg-[#FCD9DF] px-8"
      >
        <Image
          src="/assets/icons/sliders-v-alt.svg"
          alt="Slider_icon"
          width={24}
          height={24}
          className="m-2 h-6 w-6"
        />
        <span>스마트 서치</span>
      </button>
    </div>
  );
};

export default HomeScreenButton;
