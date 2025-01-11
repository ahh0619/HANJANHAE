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
  surveyData: surveyProps;
  onNext: (data: Partial<surveyProps>) => void;
  onPrev: () => void;
};

export type StepProps = {
  name: string;
  children: React.ReactNode;
};
