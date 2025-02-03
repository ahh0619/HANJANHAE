import { Dispatch, SetStateAction } from 'react';

import { SurveyType } from './preferences';

export type PreferenceTypeProps = {
  surveyData?: Partial<SurveyType>;
  handleTypeChange?: (type: string) => void;
  handlePreferenceChange?: (key: string, value: string | number) => void;
  setSurveyData?: Dispatch<SetStateAction<Partial<SurveyType>>>;
  onNext: (data: Partial<SurveyType>) => void;
  onPrev: () => void;
  currentStep: number;
};

export type StepProps = {
  name: string;
  children: React.ReactNode;
};
