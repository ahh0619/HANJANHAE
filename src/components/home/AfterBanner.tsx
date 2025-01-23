import Link from 'next/link';

const AfterBanner = () => {
  return (
    <Link
      href="/preferences/result"
      className="relative flex h-[184px] w-full flex-col items-start rounded-2xl bg-gradient-main-banner px-[20px] shadow-main-banner"
    >
      <section>
        <div className="flex flex-col gap-4">
          {/* 텍스트 영역 */}
          <div className="mt-[28px] text-lg font-bold text-white">
            <p className="leading-[27px]">취향 조사 완료!</p>
            <p className="leading-[27px]">나만을 위한 추천 리스트가</p>
            <p className="leading-[27px]">확인해보세요</p>
          </div>
          {/* 버튼 영역 */}
          <button className="mb-[29px] flex h-[26px] w-[58px] items-center justify-center rounded-xl bg-white px-[8px] py-[4px] text-xs leading-[18px] text-primary">
            보러가기
          </button>
        </div>
        {/* 이미지 영역 */}
        <img
          src="/assets/Banner_after image.svg"
          alt="Banner after"
          className="absolute bottom-0 right-[20px] h-[116px] w-[114px]"
        />
      </section>
    </Link>
  );
};

export default AfterBanner;
