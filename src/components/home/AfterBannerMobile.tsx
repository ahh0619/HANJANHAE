import Link from 'next/link';

import OptimizedImage from '@/components/common/OptimizedImage';

const AfterBannerMobile = () => {
  return (
    <Link
      href="/preferences/result"
      className="relative flex h-[184px] w-full flex-col items-start rounded-2xl bg-gradient-main-banner px-[20px] py-[20px] shadow-main-banner xl:hidden"
    >
      <div className="flex flex-col justify-between">
        <div className="text-lg font-bold leading-[27px] text-white">
          <p>취향 조사 완료!</p>
          <p>나만을 위한 추천 리스트가</p>
          <p>확인해보세요</p>
        </div>
        <button className="mt-4 flex h-[26px] w-[58px] items-center justify-center rounded-xl bg-white text-xs leading-[18px] text-primary">
          보러가기
        </button>
      </div>
      <div className="absolute bottom-0 right-[20px]">
        <OptimizedImage
          src="/assets/Banner_after image.svg"
          alt="Banner after"
          width={114}
          height={116}
        />
      </div>
    </Link>
  );
};

export default AfterBannerMobile;
