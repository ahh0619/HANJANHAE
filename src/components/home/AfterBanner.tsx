const AfterBanner = () => {
  return (
    <section
      className="relative mx-[20px] flex flex-col items-start rounded-lg px-[20px]"
      style={{
        borderRadius: '16px',
        background: 'linear-gradient(124deg, #BF324B 29.95%, #F495A6 119.58%)',
        boxShadow: '0px 5px 15px 0px rgba(249, 159, 175, 0.40)',
      }}
    >
      <div className="flex flex-col gap-4">
        {/* 텍스트 영역 */}
        <div className="mt-[28px] text-lg font-bold text-white">
          <p className="leading-[1.35]">취향 조사 완료!</p>
          <p className="leading-[1.35]">나만을 위한 추천 리스트가</p>
          <p className="leading-[1.35]">생성되었어요</p>
        </div>
        {/* 버튼 영역 */}
        <button
          className="mb-[29px] flex h-[26px] w-[58px] items-center justify-center rounded-full bg-white px-[8px] py-[4px] text-xs"
          style={{
            color: '#BF324B',
          }}
        >
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
  );
};

export default AfterBanner;
