import Link from 'next/link';

import OptimizedImage from '@/components/common/OptimizedImage';

const AfterBannerDesktop = () => {
  return (
    <Link
      href="/preferences/result"
      className="relative hidden h-[343px] w-[1280px] rounded-br-[80px] rounded-tl-[80px] bg-gradient-main-banner pb-[61px] pl-[100px] pt-[64px] shadow-main-banner xl:flex"
    >
      {/* 왼쪽 텍스트 영역 */}
      <div className="flex flex-col">
        <p className="text-title-2xl text-grayscale-100">취향 조사 완료!</p>
        <p className="text-title-2xl mt-2 text-grayscale-100">
          나만을 위한 추천 리스트가 생성되었어요
        </p>

        <button className="it mt-10 flex h-[62px] w-[130px] items-center rounded-full bg-grayscale-100 bg-white p-4 text-label-xlm text-primary">
          <span className="mr-1">보러가기</span>
          <OptimizedImage
            src="/assets/icons/desktop_chevron-right.svg"
            alt="arrow icon"
          />
        </button>
      </div>

      {/* 오른쪽 이미지 */}
      <div className="absolute bottom-0 right-[100.8px]">
        <OptimizedImage
          src="/assets/Desktop_banner_image_after.svg"
          alt="Desktop Banner After"
          width={250}
          height={290}
        />
      </div>
    </Link>
  );
};

export default AfterBannerDesktop;
