import OptimizedImage from '@/components/common/OptimizedImage';

type MobileAlcoholExplanationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileAlcoholExplanationModal = ({
  isOpen,
  onClose,
}: MobileAlcoholExplanationModalProps) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center bg-black/50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className={`w-full max-w-lg rounded-t-[24px] bg-white transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        } custom-scrollbar h-[90%] max-h-[90%] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <OptimizedImage
          src="/assets/icons/cancelDark.svg"
          alt="닫기 아이콘"
          width={24}
          height={24}
          className="absolute right-[8px] top-[20px] h-[40px] w-[40px] p-[8px]"
          onClick={onClose}
        />

        <h2 className="mb-[36px] mt-[24px] text-center text-title-xl text-grayscale-900">
          주류 용어 설명
        </h2>

        <div className="mb-[60px] space-y-[24px] px-[20px] text-sm leading-6 text-grayscale-900">
          <div>
            <p className="mb-[4px] h-[27px] text-title-lb">탁주</p>
            <p className="inline text-body-mm">
              쌀로 만든 걸쭉한 전통주, 막걸리가 대표적입니다.
            </p>
          </div>
          <div>
            <p className="mb-[4px] h-[27px] text-title-lb">증류주</p>
            <p className="inline text-body-mm">
              발효주를 증류해 도수가 높은 술, 소주 등이 포함됩니다.
            </p>
          </div>
          <div>
            <p className="mb-[4px] h-[27px] text-title-lb">청주</p>
            <p className="inline text-body-mm">
              쌀로 만든 맑고 부드러운 전통주입니다.
            </p>
          </div>
          <div>
            <p className="mb-[4px] h-[27px] text-title-lb">약주</p>
            <p className="inline text-body-mm">
              약재를 넣어 만든 맑은 술로 은은한 풍미가 있습니다.
            </p>
          </div>
          <div>
            <p className="mb-[4px] h-[27px] text-title-lb">리큐르</p>
            <p className="inline text-body-mm">
              술에 과일, 허브 등을 첨가해 독특한 풍미를 더한 술입니다.
            </p>
          </div>
          <div>
            <p className="mb-[4px] h-[27px] text-title-lb">과실주</p>
            <p className="inline text-body-mm">
              과일을 발효시켜 만든 술로, 과일 본연의 맛과 향이 강조된 술입니다.
            </p>
          </div>
          <div>
            <p className="mb-[4px] h-[27px] text-title-lb">기타 주류</p>
            <p className="inline text-body-mm">
              독특한 재료와 방식으로 만든 다양한 술입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAlcoholExplanationModal;
