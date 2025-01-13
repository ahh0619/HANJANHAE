'use server';

import { createClient } from '../supabase/server';

type UserProfile = {
  id: string;
  nickname: string;
  profile_image: string | null;
};

// 유저 정보 불러오기
export const getUserProfile = async (): Promise<UserProfile> => {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error(userError?.message || '유저 정보를 가져올 수 없습니다.');
  }

  const { id: userId } = user;

  const { data: userData, error: userDataError } = await supabase
    .from('users')
    .select('nickname, profile_image')
    .eq('id', userId)
    .single();

  if (userDataError || !userData) {
    throw new Error(
      userDataError?.message || '유저 정보를 가져올 수 없습니다.',
    );
  }

  return {
    id: userId,
    nickname: userData.nickname,
    profile_image: userData.profile_image || null,
  };
};

export type UpdateUserProfileType = {
  nickname?: string;
  profile_image?: string;
};

// 유저 정보 업데이트
export const updateUserProfile = async (
  data: UpdateUserProfileType,
): Promise<void> => {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error(userError?.message || '유저 정보를 가져올 수 없습니다.');
  }

  const userId = user.id;

  const updates: Partial<UpdateUserProfileType> = {};

  if (data.nickname) {
    updates.nickname = data.nickname;
  }

  if (data.profile_image) {
    updates.profile_image = data.profile_image;
  }

  if (Object.keys(updates).length === 0) {
    throw new Error('수정할 필드가 없습니다.');
  }

  const { error: updateError } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId);

  if (updateError) {
    throw new Error(updateError.message);
  }
};
