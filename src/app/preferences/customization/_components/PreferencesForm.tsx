'use client';

import { useRouter } from 'next/navigation';

import Modal from '@/components/common/Modal';
import usePreferences from '@/hooks/preference/usePreferences';

import AlcoholLevelSelector from './AlcoholLevelSelector';
import AlcoholTypeSelector from './AlcoholTypeSelector';
import FavoriteFoodInput from './FavoriteFoodInput';
import PreferencesFormSkeleton from './PreferencesFormSkeleton';
import TasteSelector from './TasteSelector';

type PreferencesFormProps = {
  mode: 'edit' | 'create';
};

const PreferencesForm = ({ mode }: PreferencesFormProps) => {
  const {
    preferences,
    handlePreferenceChange,
    handleTypeChange,
    handleSubmit,
    isFormComplete,
    hasPreferencesChanged,
    isLoading,
    error,
    isModalOpen,
    closeModal,
  } = usePreferences(mode);
  const router = useRouter();

  if (isLoading) return <PreferencesFormSkeleton />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="px-[19px]">
      <AlcoholTypeSelector
        mode={mode}
        preferences={preferences}
        handleTypeChange={handleTypeChange}
      />
      <AlcoholLevelSelector
        preferences={preferences}
        handleSelect={handlePreferenceChange}
      />
      <TasteSelector
        preferences={preferences}
        handleSelect={handlePreferenceChange}
      />
      <FavoriteFoodInput
        preferences={preferences}
        handleSelect={handlePreferenceChange}
      />

      <button
        onClick={handleSubmit}
        disabled={!isFormComplete || !hasPreferencesChanged}
        className={`mb-[20px] w-full rounded-[8px] py-[12px] text-label-xlm xl:mb-[220px] ${
          isFormComplete && hasPreferencesChanged
            ? 'bg-primary text-grayscale-100'
            : 'cursor-not-allowed bg-grayscale-200 text-grayscale-100'
        }`}
      >
        {mode === 'edit' ? '수정하기' : '저장하기'}
      </button>

      {/* 모달 */}
      <Modal
        isOpen={isModalOpen}
        title="취향 정보가 수정되었어요."
        content="수정된 추천 전통주 리스트를 보러갈까요?"
        secondaryAction={{
          text: '다음에 보기',
          onClick: () => {
            router.push('/mypage');
            closeModal();
          },
        }}
        primaryAction={{
          text: '보러가기',
          onClick: () => {
            router.push('/preferences/result');
            closeModal();
          },
        }}
        showCloseButton={false}
      />
    </div>
  );
};

export default PreferencesForm;
