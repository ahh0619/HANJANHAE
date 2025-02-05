import { useEffect, useState } from 'react';

import { fetchSurveyData } from '@/app/actions/preference';
import { useAuthStore } from '@/store/authStore';
import { SurveyType } from '@/types/preferences';

type Mode = 'create' | 'edit';

const usePreferences = (mode: Mode) => {
  const [preferences, setPreferences] = useState<Partial<SurveyType> | null>(
    null,
  );
  const [defaultPreferences, setDefaultPreferences] =
    useState<Partial<SurveyType> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    if (mode === 'edit' && user) {
      // 'edit' 모드일 때만 기본값 로드
      const loadSurveyDefaults = async () => {
        const defaults = await fetchSurveyData(user.id);

        if (!defaults) {
          setError('기존 설문조사 결과 가져오기 실패');
          setIsLoading(false);
          return;
        }

        setPreferences(defaults);
        setDefaultPreferences(defaults);
        setIsLoading(false);
      };

      loadSurveyDefaults();
    } else if (mode === 'create') {
      setPreferences({
        type: '',
        level: null,
        sweetness: null,
        acidity: null,
        carbonation: null,
        body: null,
        food: '',
      });
      setIsLoading(false);
    }
  }, [mode, user]);

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

      return { ...prev, type: updatedTypes };
    });
  };

  const isFormComplete =
    preferences?.type.length > 0 &&
    preferences?.level !== null &&
    preferences?.sweetness !== null &&
    preferences?.acidity !== null &&
    preferences?.carbonation !== null &&
    preferences?.body !== null &&
    preferences?.food !== '';

  const hasPreferencesChanged =
    JSON.stringify(preferences) !== JSON.stringify(defaultPreferences);

  return {
    preferences,
    handlePreferenceChange,
    handleTypeChange,
    isFormComplete,
    hasPreferencesChanged,
    isLoading,
    error,
  };
};

export default usePreferences;
