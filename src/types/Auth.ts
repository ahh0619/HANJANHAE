import { Database } from './supabase';

export type SignInDataType = {
  email: string;
  password: string;
};

export type SignUpDataType = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  birth: string;
};

export type UserType = Omit<
  Database['public']['Tables']['users']['Row'],
  'created_at'
>;
