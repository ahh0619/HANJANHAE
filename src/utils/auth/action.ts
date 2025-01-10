'use server';
import { redirect } from 'next/navigation';

import { SignInDataType, SignUpDataType, UserType } from '@/types/Auth';

import { createClient } from '../supabase/server';

/* 회원가입 */
export const signup = async (data: SignUpDataType): Promise<void> => {
  const supabase = createClient();

  const { email, password, nickname, birth } = data;

  // auth user 데이터 생성
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { nickname, birth },
    },
  });

  if (authError) throw new Error(authError.message);

  // user 데이터 생성
  const { error: userError } = await supabase.from('users').insert({
    id: authData.user?.id,
    nickname,
    birth,
  });

  if (userError) throw new Error(userError.message);

  await logout();
};

/* 로그인 */
export const signin = async (data: SignInDataType): Promise<void> => {
  const supabase = createClient();

  const { email, password } = data;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
};

/* 사용자 정보 가져오기 */
export const fetchUser = async (): Promise<UserType | null> => {
  const supabase = createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData.user) return null;

  const { data, error } = await supabase
    .from('users')
    .select('id, nickname, profile_image, birth')
    .eq('id', authData.user.id)
    .single();

  return error ? null : data;
};

/* 로그아웃 */
export const logout = async (): Promise<void> => {
  const supabase = createClient();

  await supabase.auth.signOut();

  redirect('/signin');
};
