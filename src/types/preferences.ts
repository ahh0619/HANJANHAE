import { Database } from './supabase';

export type ResultType = Database['public']['Tables']['reco_results']['Row'];

export type SurveyType = Database['public']['Tables']['survey']['Row'];

export type PreferenceProps = {
  preferences: Partial<SurveyType>;
  handleSelect: (key: string, value: string | number) => void;
};
