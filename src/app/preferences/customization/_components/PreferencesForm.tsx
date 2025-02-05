'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { updateSurvey } from '@/app/actions/preference';
import { useModal } from '@/app/providers/ModalProvider';
import usePreferences from '@/hooks/preference/usePreferences';
import { saveSurveyData } from '@/lib/recommendations';
import { useAuthStore } from '@/store/authStore';

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
    isFormComplete,
    hasPreferencesChanged,
    isLoading,
    error,
  } = usePreferences(mode);
  const { openModal, closeModal } = useModal();
  const [submitError, setSubmitError] = useState<string>('');
  const { user } = useAuthStore();
  const router = useRouter();

  const handleGoBack = () => {
    const isFromResultPage = localStorage.getItem('fromResultPage');
    localStorage.setItem('fromResultPage', 'no');

    if (isFromResultPage === 'yes') {
      router.push('/');
    } else {
      router.back();
    }
  };

  const handleOpenModal = () => {
    openModal({
      title: '취향 정보가 수정되었어요.',
      content: '수정된 추천 전통주 리스트를 보러갈까요?',
      secondaryAction: {
        text: '다음에 보기',
        onClick: () => {
          handleGoBack();
          closeModal();
        },
      },
      primaryAction: {
        text: '보러가기',
        onClick: () => {
          localStorage.setItem('fromResultPage', 'no');
          router.push('/preferences/result');
          closeModal();
        },
      },
      showCloseButton: false,
    });
  };

  const handleSubmit = async () => {
    try {
      if (mode === 'edit') {
        await updateSurvey({ surveyData: preferences, userId: user.id });
        handleOpenModal();
      } else {
        await saveSurveyData(preferences);
        router.push('/preferences/result');
      }
    } catch (error) {
      console.log('내 생각대로 왜 안돼');
      setSubmitError(error.message);
      // throw Error(error.message);
    }
  };

  if (isLoading) return <PreferencesFormSkeleton />;
  if (error || submitError) throw new Error(error || submitError);

  return (
    <div className="px-[19px] xl:px-0">
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
        className={`mb-[20px] w-full rounded-[8px] py-[12px] text-label-xlm xl:mb-[92px] ${
          isFormComplete && hasPreferencesChanged
            ? 'bg-primary text-grayscale-100'
            : 'cursor-not-allowed bg-grayscale-200 text-grayscale-100'
        }`}
      >
        {mode === 'edit' ? '수정하기' : '완료'}
      </button>
    </div>
  );
};

export default PreferencesForm;
