import { Dispatch, SetStateAction } from 'react';

import { Tables } from './supabase';

export type surveyProps = {
  type: string[] | null;
  level: string | null;
  sweetness: string | null;
  acidity: string | null;
  carbonation: string | null;
  body: string | null;
  food: string | null;
};

export type PreferenceTypeProps = {
  surveyData?: Partial<Tables<'survey'>>;
  handleTypeChange?: (type: string) => void;
  handlePreferenceChange?: (key: string, value: string | number) => void;
  setSurveyData?: Dispatch<SetStateAction<Partial<Tables<'survey'>>>>;
  onNext: (data: Partial<Tables<'survey'>>) => void;
  onPrev: () => void;
  currentStep: number;
};

export type StepProps = {
  name: string;
  children: React.ReactNode;
};
