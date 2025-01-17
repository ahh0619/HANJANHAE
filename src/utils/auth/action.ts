'use server';
import { User } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

import {
  CheckEmailType,
  ResetPasswordType,
  SignInDataType,
  SignUpDataType,
  UserType,
} from '@/types/Auth';

import { adminClient } from '../supabase/admin';
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

  await signout();

  redirect('/signin');
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

  redirect('/');
};

/* 로그아웃 */
export const signout = async (): Promise<void> => {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);

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
    agree_terms: userData.agree_terms,
  };
};

/* 비밀번호 재설정을 위한 이메일 전송 */
export const sendEmailForResetPassword = async (
  values: CheckEmailType,
): Promise<void> => {
  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_URL}/password/reset`,
  });

  if (error) throw new Error(error.message);
};

/* 비밀번호 재설정 */
export const resetPassword = async (
  values: ResetPasswordType & { token: string },
): Promise<void> => {
  const supabase = createClient();

  const { error: sessionError } = await supabase.auth.exchangeCodeForSession(
    values.token,
  );

  if (sessionError) throw new Error(sessionError.message);

  const { error } = await supabase.auth.updateUser({
    password: values.password,
  });

  if (error) throw new Error(error.message);

  redirect('/mypage');
};

/* 회원 탈퇴 */
export const deleteUser = async (): Promise<void> => {
  const supabase = createClient();

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) throw new Error(sessionError.message);

  const { error } = await adminClient.deleteUser(session.user.id);

  if (error) throw new Error(error.message);

  redirect('/');
};

/* 닉네임 중복 확인 */
export const checkNickname = async (nickname: string): Promise<boolean> => {
  const supabase = createClient();

  // 닉네임이 존재하는지 확인
  const { data, error } = await supabase
    .from('users')
    .select('id') // 최소 필드만 선택
    .eq('nickname', nickname)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(error.message);
  }

  return Boolean(data);
};
