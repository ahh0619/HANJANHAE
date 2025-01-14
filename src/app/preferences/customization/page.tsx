'use client';

import BackButton from '@/components/common/BackButton';
import usePreferences from '@/hooks/preference/usePreferences';

import AlcoholLevelSelector from './_components/AlcoholLevelSelector';
import AlcoholTypeSelector from './_components/AlcoholTypeSelector';
import FavoriteFoodInput from './_components/FavoriteFoodInput';
import TasteSelector from './_components/TasteSelector';

const Page = () => {
  const {
    preferences,
    handlePreferenceChange,
    handleTypeChange,
    handleFoodChange,
    handleSubmit,
    isFormComplete,
  } = usePreferences();

  return (
    <div className="mx-auto max-w-lg p-6">
      <div className="relative mb-5 flex w-full items-center">
        <div className="absolute left-0">
          <BackButton />
        </div>
        <h1 className="mx-auto text-xl font-bold">내 취향 조사</h1>
      </div>

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
        disabled={!isFormComplete}
        className={`mb-10 w-full rounded-md py-3 text-lg font-bold ${
          isFormComplete
            ? 'bg-black text-white'
            : 'cursor-not-allowed bg-gray-300 text-gray-500'
        }`}
      >
        저장하기
      </button>
    </div>
  );
};

export default Page;
