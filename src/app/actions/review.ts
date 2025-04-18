'use server';

import { createClient } from '@/utils/supabase/server';

type CommentWithUser = {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  users: {
    nickname: string | null;
    profile_image: string | null;
  } | null;
};

// 특정 주류에 대한 리뷰 목록 가져오기
export const fetchReviews = async (
  drinkId: string,
  page?: number,
  limit?: number,
) => {
  if (!drinkId) {
    throw new Error('drink_id is required');
  }

  const supabase = createClient();

  const offset = page && limit ? (page - 1) * limit : 0;
  const rangeEnd = limit ? offset + limit - 1 : undefined;

  const { data: comments, error: commentsError } = (await supabase
    .from('comments')
    .select(
      `
      id,
      user_id,
      content,
      created_at,
      updated_at,
      users (
        nickname,
        profile_image
      )
    `,
    )
    .eq('drink_id', drinkId)
    .order('created_at', { ascending: false })
    .range(offset, rangeEnd)) as {
    data: CommentWithUser[];
    error: any;
  };

  if (commentsError) {
    throw new Error(commentsError.message);
  }

  if (!comments || comments.length === 0) {
    return [];
  }

  // 평점 데이터 조회
  const { data: ratings, error: ratingsError } = await supabase
    .from('ratings')
    .select('comment_id, rating');

  if (ratingsError) {
    throw new Error(ratingsError.message);
  }

  // 댓글 데이터와 평점 데이터를 매핑하여 리뷰 목록 생성
  const reviews = comments.map((comment) => {
    const matchingRating = ratings?.find(
      (rating) => rating.comment_id === comment.id,
    );
    const isEdited =
      comment.updated_at && comment.updated_at !== comment.created_at;

    return {
      id: comment.id,
      user_id: comment.user_id,
      nickname: comment.users?.nickname,
      content: comment.content,
      rating: matchingRating ? matchingRating.rating : 0,
      created_at: comment.created_at,
      updated_at: comment.updated_at,
      profile_image: comment.users?.profile_image,
      is_edited: isEdited,
    };
  });

  return reviews;
};

// 리뷰 생성
export const submitReview = async ({
  drinkId,
  userId,
  content,
  rating,
}: {
  drinkId: string;
  userId: string;
  content: string;
  rating: number;
}) => {
  if (!drinkId || !userId || !content || typeof rating !== 'number') {
    throw new Error('Invalid input data');
  }

  const supabase = createClient();

  // 댓글 데이터 삽입
  const { data: comment, error: commentError } = await supabase
    .from('comments')
    .insert([
      {
        drink_id: drinkId,
        user_id: userId,
        content,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select('id')
    .single();

  if (commentError) {
    throw new Error(commentError.message);
  }

  // 평점 데이터 삽입
  const { error: ratingError } = await supabase.from('ratings').insert([
    {
      drink_id: drinkId,
      user_id: userId,
      rating,
      comment_id: comment.id,
      created_at: new Date().toISOString(),
    },
  ]);

  if (ratingError) {
    throw new Error(ratingError.message);
  }

  return { message: 'Review submitted successfully' };
};

// 리뷰 업데이트
export const updateReview = async ({
  id,
  updatedComment,
  updatedRating,
}: {
  id: string;
  updatedComment: string;
  updatedRating: number;
}) => {
  if (!id || !updatedComment || typeof updatedRating !== 'number') {
    throw new Error('Invalid input data');
  }

  const supabase = createClient();

  // 댓글 및 평점 데이터 업데이트
  const { data, error } = await supabase
    .from('comments')
    .update({
      content: updatedComment,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const { error: ratingError } = await supabase
    .from('ratings')
    .update({ rating: updatedRating })
    .eq('comment_id', id);

  if (ratingError) {
    throw new Error(ratingError.message);
  }

  return data;
};

// 리뷰 삭제
export const deleteReview = async (id: string) => {
  if (!id) {
    throw new Error('Review ID is required');
  }

  const supabase = createClient();

  const { error } = await supabase.from('comments').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return { message: 'Review deleted successfully' };
};
