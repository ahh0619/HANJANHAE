import OptimizedImage from '@/components/common/OptimizedImage';
import useDisableScroll from '@/hooks/search/useDisableScroll';
import useModalStore from '@/store/modalStore';
import { SurveyType } from '@/types/preferences';

import AlcoholExplanationModal from './AlcoholExplanationModal';

const ALCOHOL_TYPES = [
  { key: '탁주', label: '탁주' },
  { key: '증류주', label: '증류주' },
  { key: '청주', label: '청주' },
  { key: '약주', label: '약주' },
  { key: '리큐르', label: '리큐르' },
  { key: '과실주', label: '과실주' },
  { key: '기타주류', label: '기타주류' },
];

type AlcoholTypeSelectorProps = {
  preferences: Partial<SurveyType>;
  handleTypeChange: (type: string) => void;
  mode: 'edit' | 'create';
};

const AlcoholTypeSelector = ({
  preferences,
  handleTypeChange,
  mode,
}: AlcoholTypeSelectorProps) => {
  const { isModalOpen, openModal, closeModal } = useModalStore();
  useDisableScroll(isModalOpen);

  return (
    <div className="mb-10 w-full xl:mb-[72px]">
      <label className="mb-[16px] block text-title-mb xl:mb-[20px] xl:text-title-lb">
        1. 어떤 종류의 술을 선호하시나요?
        <span className="ml-1 inline xl:block xl:before:content-['\2002']">
          (중복선택 가능)
        </span>
      </label>

      <div className="flex h-[92px] w-[311px] flex-wrap gap-x-[16px] gap-y-[12px] xl:w-[370px]">
        {ALCOHOL_TYPES.map((type) => (
          <button
            key={type.key}
            onClick={() => handleTypeChange(type.key)}
            className={`flex items-center justify-center rounded-[16px] border px-[12px] py-[8px] text-label-lm leading-5 ${
              preferences?.type?.includes(type.key)
                ? 'border-transparent bg-primary-100 text-grayscale-100'
                : 'border-grayscale-500 bg-white text-grayscale-900'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div
        className={`mt-[20px] flex h-[24px] w-[125px] cursor-pointer text-label-lm leading-[24px] text-grayscale-500 ${mode === 'edit' && 'hidden'}`}
        onClick={openModal}
      >
        주류용어설명
        <OptimizedImage
          src="/fi_alert-circle.svg"
          alt="설명 아이콘"
          width={24}
          height={24}
          className="cursor-pointe ml-[8px] h-[24px] w-[24px]"
        />
      </div>

      <AlcoholExplanationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default AlcoholTypeSelector;
