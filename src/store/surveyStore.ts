import { create } from 'zustand';

import { fetchUser } from '@/utils/auth/action';
import { hasSurveyRecord } from '@/utils/preference/action';

interface SurveyState {
  isSurveyCompleted: boolean;
  setIsSurveyCompleted: (completed: boolean) => void;
  fetchSurveyStatus: () => Promise<void>;
}

export const useSurveyStore = create<SurveyState>((set) => ({
  isSurveyCompleted: false,
  setIsSurveyCompleted: (completed) => set({ isSurveyCompleted: completed }),
  fetchSurveyStatus: async () => {
    const user = await fetchUser();
    if (user) {
      const isCompleted = await hasSurveyRecord(user.id);
      set({ isSurveyCompleted: isCompleted });
    } else {
      const isCompleted = !!localStorage.getItem('surveyData');
      set({ isSurveyCompleted: isCompleted });
    }
  },
}));
