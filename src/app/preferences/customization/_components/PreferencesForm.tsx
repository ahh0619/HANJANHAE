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
    <>
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
        className={`mb-10 w-full rounded-md py-3 text-lg font-bold ${
          isFormComplete && hasPreferencesChanged
            ? 'bg-black text-white'
            : 'cursor-not-allowed bg-gray-300 text-gray-500'
        }`}
      >
        저장하기
      </button>
    </>
  );
};

export default PreferencesForm;
