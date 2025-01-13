'use server';
import { redirect } from 'next/navigation';

import { SignInDataType, SignUpDataType, UserType } from '@/types/Auth';

import { createClient } from '../supabase/server';

/* 회원가입 */
export const signup = async (data: SignUpDataType): Promise<void> => {
  const supabase = createClient();

  const { email, password, nickname } = data;

  // auth user 데이터 생성
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name: nickname, avatar_url: '' },
    },
  });

  if (authError) throw new Error(authError.message);

  // user 데이터 생성
  const { error: userError } = await supabase.from('users').insert({
    id: authData.user?.id,
    nickname,
  });

  if (userError) throw new Error(userError.message);

  await logout();
};

/* 로그인 */
export const signin = async (data: SignInDataType): Promise<UserType> => {
  const supabase = createClient();

  const { email, password } = data;

  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return {
    id: user.id,
    nickname: user.user_metadata.name,
    profile_image: user.user_metadata.avatar_url,
  };
};

/* 로그아웃 */
export const logout = async (): Promise<void> => {
  const supabase = createClient();

  await supabase.auth.signOut();

  redirect('/signin');
};

/* 사용자 정보 가져오기 */
export const fetchUser = async (): Promise<UserType | null> => {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  return {
    id: user.id,
    nickname: user.user_metadata.name,
    profile_image: user.user_metadata.avatar_url,
  };
};
