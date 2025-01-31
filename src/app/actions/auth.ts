'use server';
import { redirect } from 'next/navigation';

import {
  CheckEmailType,
  ResetPasswordType,
  SignUpDataType,
  UserType,
} from '@/types/Auth';
import { adminClient } from '@/utils/supabase/admin';
import { createClient } from '@/utils/supabase/server';

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

/* 로그아웃 */
export const signout = async (): Promise<void> => {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);

  redirect('/signin');
};

/* 사용자 정보 가져오기 */
export const fetchUser = async (): Promise<UserType | null> => {
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
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
  values: ResetPasswordType & { user: UserType; token: string },
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

  if (!values.user) await signout();

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
};
