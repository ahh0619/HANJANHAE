const AlcoholExplanationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative h-[456px] w-[560px] rounded-2xl bg-white shadow-lg">
        {/* 닫기 버튼 */}
        <img
          src="/assets/icons/cancelDark.svg"
          className="absolute right-[24px] top-[24px]"
          onClick={onClose}
        />

        {/* 모달 내부 내용 (스크롤 가능) */}
        <div className="flex h-full flex-col p-[24px]">
          {/* 제목 */}
          <h2 className="mb-[8px] mt-[24px] text-center text-title-xl font-bold">
            주류 용어 설명
          </h2>

          {/* 주류 설명 리스트 (항상 스크롤바 표시) */}
          <div className="scrollbar-thin scrollbar-thumb-grayscale-300 scrollbar-track-gray-100 flex-1 overflow-y-scroll px-[16px]">
            <div className="mb-[35px]">
              <span className="text-title-lb">탁주</span>
              <p className="text-body-mm">
                쌀로 만든 걸쭉한 전통주, 막걸리가 대표적입니다.
              </p>
            </div>
            <div className="mb-[35px]">
              <span className="text-title-lb">증류주</span>
              <p className="text-body-mm">
                발효주를 증류해 도수가 높은 술, 소주 등이 포함됩니다.
              </p>
            </div>
            <div className="mb-[35px]">
              <span className="text-title-lb">청주</span>
              <p className="text-body-mm">
                쌀로 만든 맑고 부드러운 전통주입니다.
              </p>
            </div>
            <div className="mb-[35px]">
              <span className="text-title-lb">약주</span>
              <p className="text-body-mm">
                약재를 넣어 만든 맑은 술로 은은한 풍미가 있습니다.
              </p>
            </div>
            <div className="mb-[35px]">
              <span className="text-title-lb">리큐르</span>
              <p className="text-body-mm">
                술에 과일, 허브 등을 첨가해 달콤하거나 독특한 풍미를 더한
                술입니다.
              </p>
            </div>
            <div className="mb-[35px]">
              <span className="text-title-lb">과실주</span>
              <p className="text-body-mm">
                과일을 발효시켜 만든 술로, 과일 본연의 맛과 향이 강조된
                술입니다.
              </p>
            </div>
            <div className="mb-[35px]">
              <span className="text-title-lb">기타 주류</span>
              <p className="text-body-mm">
                독특한 재료와 방식으로 만든 다양한 술입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlcoholExplanationModal;
