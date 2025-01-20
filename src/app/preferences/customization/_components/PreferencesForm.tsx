'use client';

import usePreferences from '@/hooks/preference/usePreferences';

import AlcoholLevelSelector from './AlcoholLevelSelector';
import AlcoholTypeSelector from './AlcoholTypeSelector';
import FavoriteFoodInput from './FavoriteFoodInput';
import PreferencesFormSkeleton from './PreferencesFormSkeleton';
import TasteSelector from './TasteSelector';

const PreferencesForm = () => {
  const {
    preferences,
    handlePreferenceChange,
    handleTypeChange,
    handleFoodChange,
    handleSubmit,
    isFormComplete,
    hasPreferencesChanged,
    isLoading,
    error,
  } = usePreferences();

  if (isLoading) return <PreferencesFormSkeleton />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="px-[19px]">
      <AlcoholTypeSelector
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
        handleFoodChange={handleFoodChange}
      />

      <button
        onClick={handleSubmit}
        disabled={!isFormComplete || !hasPreferencesChanged}
        className={`mb-[20px] w-full rounded-[8px] py-[12px] text-label-xlm ${
          isFormComplete && hasPreferencesChanged
            ? 'bg-primary text-grayscale-100'
            : 'cursor-not-allowed bg-grayscale-200 text-grayscale-500'
        }`}
      >
        수정하기
      </button>
    </div>
  );
};

export default PreferencesForm;
