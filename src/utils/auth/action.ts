'use server';
import { User } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

import { SignInDataType, SignUpDataType, UserType } from '@/types/Auth';

import { createClient } from '../supabase/server';

/* 회원가입 */
export const signup = async (data: SignUpDataType): Promise<void> => {
  const supabase = createClient();

  const { email, password, nickname } = data;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name: nickname, avatar_url: '' },
    },
  });

  if (error) throw new Error(error.message);

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

/* 로그아웃 */
export const logout = async (): Promise<void> => {
  const supabase = createClient();

  await supabase.auth.signOut();

  redirect('/signin');
};

/* 로그인 여부 확인하기 */
export const checkUser = async (): Promise<User | null> => {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return error || !user ? null : user;
};

/* 사용자 정보 가져오기 */
export const fetchUser = async (): Promise<UserType | null> => {
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error(authError.message || '유저 정보를 가져올 수 없습니다.');
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (userError || !userData) {
    throw new Error(userError.message || '유저 정보를 가져올 수 없습니다.');
  }

  return {
    id: userData.id,
    nickname: userData.nickname,
    profile_image: userData.profile_image || null,
  };
};
