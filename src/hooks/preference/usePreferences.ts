import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { fetchSurveyData, updateSurvey } from '@/app/actions/preference';
import { useAuthStore } from '@/store/authStore';
import { Tables } from '@/types/supabase';

const usePreferences = () => {
  const [preferences, setPreferences] = useState<Tables<'survey'> | null>(null);
  const [defaultPreferences, setDefaultPreferences] =
    useState<Tables<'survey'> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const loadSurveyDefaults = async () => {
      try {
        if (user) {
          const defaults = await fetchSurveyData(user.id);
          setPreferences(defaults);
          setDefaultPreferences(defaults); // 초기값 저장
          setIsLoading(false);
        }
      } catch (err) {
        setError('Failed to load survey defaults');
        setIsLoading(false);
      }
    };

    loadSurveyDefaults();
  }, [user]);

  const handlePreferenceChange = (key: string, value: string | number) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const handleTypeChange = (type: string) => {
    setPreferences((prev) => {
      const typesArray = prev?.type ? prev.type.split(',') : [];
      let updatedTypes;

      if (typesArray.includes(type)) {
        updatedTypes = typesArray.filter((item) => item !== type).join(',');
      } else {
        updatedTypes = [...typesArray, type].join(',');
      }

      const isChanged = updatedTypes !== defaultPreferences?.type;

      return isChanged
        ? { ...prev, type: updatedTypes }
        : { ...prev, type: defaultPreferences?.type };
    });
  };

  const handleFoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreferences((prev) => ({ ...prev, food: e.target.value }));
  };

  const handleSubmit = async () => {
    console.log('preferences Saved:', preferences);
    await updateSurvey({ surveyData: preferences, userId: user.id });
    router.push('/preferences/result');
  };

  const isFormComplete =
    preferences?.type.length > 0 &&
    preferences?.level &&
    preferences?.sweetness !== null &&
    preferences?.acidity !== null &&
    preferences?.carbonation !== null &&
    preferences?.body !== null &&
    preferences?.food;

  const hasPreferencesChanged =
    JSON.stringify(preferences) !== JSON.stringify(defaultPreferences);

  return {
    preferences,
    handlePreferenceChange,
    handleTypeChange,
    handleFoodChange,
    handleSubmit,
    isFormComplete,
    hasPreferencesChanged,
    isLoading,
    error,
  };
};

export default usePreferences;
