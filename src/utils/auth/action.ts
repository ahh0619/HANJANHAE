'use server';
import { redirect } from 'next/navigation';

import { UserType } from '@/types/Auth';

import { createClient } from '../supabase/server';

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
