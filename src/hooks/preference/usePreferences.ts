import { useState } from 'react';

const usePreferences = () => {
  const [preferences, setPreferences] = useState({
    types: '',
    level: '',
    sweetness: null,
    acidity: null,
    carbonation: null,
    body: null,
    food: '',
  });

  const handlePreferenceChange = (key: string, value: string | number) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const handleTypeChange = (type: string) => {
    setPreferences((prev) => {
      const typesArray = prev.types ? prev.types.split(',') : [];
      if (typesArray.includes(type)) {
        const updatedTypes = typesArray
          .filter((item) => item !== type)
          .join(',');
        return { ...prev, types: updatedTypes };
      } else {
        const updatedTypes = [...typesArray, type].join(',');
        return { ...prev, types: updatedTypes };
      }
    });
  };

  const handleFoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreferences((prev) => ({ ...prev, food: e.target.value }));
  };

  const handleSubmit = () => {
    console.log('Preferences Saved:', preferences);
  };

  const isFormComplete =
    preferences.types.length > 0 &&
    preferences.level &&
    preferences.sweetness !== null &&
    preferences.acidity !== null &&
    preferences.carbonation !== null &&
    preferences.body !== null &&
    preferences.food;

  return {
    preferences,
    handlePreferenceChange,
    handleTypeChange,
    handleFoodChange,
    handleSubmit,
    isFormComplete,
  };
};

export default usePreferences;
