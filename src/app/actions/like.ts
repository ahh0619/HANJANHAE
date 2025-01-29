'use server';

import { createClient } from '@/utils/supabase/server';

type ToggleLikeParams = {
  userId: string;
  drinkId: string;
};

// 전체적인 좋아요 상태관리
export const fetchAllLikeStatus = async (
  userId: string,
): Promise<Record<string, boolean>> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('likes')
    .select('drink_id')
    .eq('user_id', userId);

  if (error) {
    console.error(error);
    throw new Error('전체 좋아요 상태 조회 실패');
  }

  const likeMap: Record<string, boolean> = {};
  (data || []).forEach((row) => {
    if (row.drink_id) {
      likeMap[row.drink_id] = true;
    }
  });
  return likeMap;
};

// 좋아요 토글 액션
export const toggleLike = async ({
  userId,
  drinkId,
}: ToggleLikeParams): Promise<{ success: boolean; liked: boolean }> => {
  const supabase = createClient();

  const { data: existingLike, error: fetchError } = await supabase
    .from('likes')
    .select('*')
    .eq('user_id', userId)
    .eq('drink_id', drinkId)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    throw new Error('좋아요 상태를 확인할 수 없습니다.');
  }

  if (existingLike) {
    const { error: deleteError } = await supabase
      .from('likes')
      .delete()
      .eq('id', existingLike.id);

    if (deleteError) {
      throw new Error('좋아요를 취소할 수 없습니다.');
    }

    return { success: true, liked: false };
  } else {
    const { error: insertError } = await supabase
      .from('likes')
      .insert({ user_id: userId, drink_id: drinkId });

    if (insertError) {
      throw new Error('좋아요를 추가할 수 없습니다.');
    }

    return { success: true, liked: true };
  }
};

export const fetchLikesByUser = async ({
  userId,
  pageParam = 1,
  limit = 10,
}: {
  userId: string;
  pageParam: number;
  limit?: number;
}) => {
  const supabase = await createClient();

  const start = (pageParam - 1) * limit;
  const end = start + limit - 1;

  const { data, error, count } = await supabase
    .from('likes')
    .select(
      `
      *,
      drinks(*)
    `,
      { count: 'exact' },
    )
    .eq('user_id', userId)
    .range(start, end);

  if (error) {
    throw new Error(`유저 기반으로 좋아요 가져오기 실패: ${error.message}`);
  }

  return {
    data,
    nextPage: end + 1 < count ? pageParam + 1 : undefined,
  };
};
