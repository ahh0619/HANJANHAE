const BeforeBanner = () => {
  return (
    <section
      className="relative mx-[20px] flex flex-col items-start rounded-lg px-[20px]"
      style={{
        borderRadius: '16px',
        background: 'linear-gradient(124deg, #BF324B 29.95%, #F495A6 119.58%)',
        boxShadow: '0px 5px 15px 0px rgba(249, 159, 175, 0.40)',
      }}
    >
      {/* 텍스트 영역 */}
      <p className="mb-[8px] mt-[28px] text-xs font-bold leading-[18px] text-white">
        취향 조사 후 나만을 위한 추천 리스트를 확인해보세요!
      </p>

      <div className="mb-[76px] text-[20px] font-bold">
        <p className="leading-[1.35] text-white">AI가 맞춤 전통주를</p>
        <p className="leading-[1.35]] text-white">추천해드려요</p>
      </div>

      {/* 이미지 영역 */}
      <img
        src="/assets/Banner_before image.svg"
        alt="Banner Before"
        className="absolute bottom-[12px] right-[20px] h-[118px] w-[118px]"
      />
    </section>
  );
};

export default BeforeBanner;
