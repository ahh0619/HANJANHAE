import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { fetchSurveyData, updateSurvey } from '@/app/actions/preference';
import { saveSurveyData } from '@/lib/recommendations';
import { useAuthStore } from '@/store/authStore';
import { Tables } from '@/types/supabase';

type Mode = 'create' | 'edit';
const usePreferences = (mode: Mode) => {
  const [preferences, setPreferences] =
    useState<Partial<Tables<'survey'> | null>>(null);
  const [defaultPreferences, setDefaultPreferences] =
    useState<Tables<'survey'> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuthStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (mode === 'edit' && user) {
      // 'edit' 모드일 때만 기본값 로드
      const loadSurveyDefaults = async () => {
        try {
          const defaults = await fetchSurveyData(user.id);
          setPreferences(defaults);
          setDefaultPreferences(defaults);
        } catch (err) {
          setError('기존 설문조사 결과 가져오기 실패');
        } finally {
          setIsLoading(false);
        }
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

  const handleSubmit = async () => {
    console.log('Preferences Saved:', preferences);
    try {
      if (mode === 'edit') {
        await updateSurvey({ surveyData: preferences, userId: user.id });
        openModal();
      } else {
        await saveSurveyData(preferences);
        router.push('/preferences/result');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const isFormComplete =
    preferences?.type.length > 0 &&
    preferences?.level !== null &&
    preferences?.sweetness !== null &&
    preferences?.acidity !== null &&
    preferences?.carbonation !== null &&
    preferences?.body !== null &&
    preferences?.food !== null;

  const hasPreferencesChanged =
    JSON.stringify(preferences) !== JSON.stringify(defaultPreferences);

  return {
    preferences,
    handlePreferenceChange,
    handleTypeChange,
    handleSubmit,
    isFormComplete,
    hasPreferencesChanged,
    isLoading,
    error,
    openModal,
    closeModal,
    isModalOpen,
    setIsModalOpen,
  };
};

export default usePreferences;
