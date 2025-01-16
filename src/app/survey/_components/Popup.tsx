interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const Popup = ({ isOpen, onClose }: PopupProps) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-end bg-black/50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      onClick={onClose} // 팝업 외부 클릭 시 닫힘
    >
      <div
        className={`w-full transform rounded-t-3xl bg-white p-5 transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        } h-[90vh] max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않음
      >
        <button
          className="absolute right-5 top-3 text-xl text-gray-400"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="mb-6 text-center text-lg font-bold">주류 용어 설명</h2>
        <div className="space-y-3 text-sm leading-6">
          <div>
            <p className="font-bold">탁주:</p>
            <p className="inline">
              쌀로 만든 걸쭉한 전통주, 막걸리가 대표적입니다.
            </p>
          </div>
          <div>
            <p className="font-bold">증류주:</p>
            <p className="inline">
              발효주를 증류해 도수가 높은 술, 소주 등이 포함됩니다.
            </p>
          </div>
          <div>
            <p className="font-bold">청주:</p>
            <p className="inline">쌀로 만든 맑고 부드러운 전통주입니다.</p>
          </div>
          <div>
            <p className="font-bold">약주:</p>
            <p className="inline">
              약재를 넣어 만든 맑은 술로 은은한 풍미가 있습니다.
            </p>
          </div>
          <div>
            <p className="font-bold">리큐르:</p>
            <p className="inline">
              술에 과일, 허브 등을 첨가해 독특한 풍미를 더한 술입니다.
            </p>
          </div>
          <div>
            <p className="font-bold">과실주:</p>
            <p className="inline">
              과일을 발효시켜 만든 술로, 과일 본연의 맛과 향이 강조된 술입니다.
            </p>
          </div>
          <div>
            <p className="font-bold">기타 주류:</p>
            <p className="inline">
              독특한 재료와 방식으로 만든 다양한 술입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
