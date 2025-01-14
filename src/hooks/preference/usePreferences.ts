import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAuthStore } from '@/store/authStore';
import { Tables } from '@/types/supabase';
import { fetchSurveyData, updateSurvey } from '@/utils/preference/action';

const usePreferences = () => {
  const [preferences, setPreferences] = useState<Tables<'survey'> | null>(null);
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
      const typesArray = prev.type ? prev.type.split(',') : [];
      if (typesArray.includes(type)) {
        const updatedTypes = typesArray
          .filter((item) => item !== type)
          .join(',');
        return { ...prev, type: updatedTypes };
      } else {
        const updatedTypes = [...typesArray, type].join(',');
        return { ...prev, type: updatedTypes };
      }
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

  return {
    preferences,
    handlePreferenceChange,
    handleTypeChange,
    handleFoodChange,
    handleSubmit,
    isFormComplete,
    isLoading,
    error,
  };
};

export default usePreferences;
