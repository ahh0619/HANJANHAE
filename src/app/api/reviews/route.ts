import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

// 특정 주류에 대한 리뷰 목록 가져오기
export async function GET(req: Request) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const drinkId = searchParams.get('drink_id');

  if (!drinkId) {
    return NextResponse.json(
      { error: 'drink_id is required' },
      { status: 400 },
    );
  }

  // 댓글 데이터 조회
  const { data: comments, error: commentsError } = await supabase
    .from('comments')
    .select('id, user_id, nickname, content, created_at')
    .eq('drink_id', drinkId)
    .order('created_at', { ascending: false });

  if (commentsError) {
    return NextResponse.json({ error: commentsError.message }, { status: 500 });
  }

  if (!comments || comments.length === 0) {
    // 댓글이 없으면 빈 배열 반환
    return NextResponse.json([]);
  }

  // 평점 데이터 조회
  const { data: ratings, error: ratingsError } = await supabase
    .from('ratings')
    .select('comment_id, rating');

  if (ratingsError) {
    return NextResponse.json({ error: ratingsError.message }, { status: 500 });
  }

  // 댓글 데이터와 평점 데이터를 매핑하여 리뷰 목록 생성
  const reviews = comments.map((comment) => {
    const matchingRating = ratings?.find(
      (rating) => rating.comment_id === comment.id,
    );
    return {
      id: comment.id,
      user_id: comment.user_id,
      nickname: comment.nickname,
      comment: comment.content,
      rating: matchingRating ? matchingRating.rating : 0,
      created_at: comment.created_at,
    };
  });

  return NextResponse.json(reviews);
}

// 리뷰 생성
export async function POST(req: Request) {
  const supabase = createClient();
  const body = await req.json();

  const { drinkId, userId, content, rating, nickname } = body;

  if (
    !drinkId ||
    !userId ||
    !content ||
    typeof rating !== 'number' ||
    !nickname
  ) {
    return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
  }

  // 댓글 데이터 삽입
  const { data: comment, error: commentError } = await supabase
    .from('comments')
    .insert([
      {
        drink_id: drinkId,
        user_id: userId,
        nickname,
        content,
        created_at: new Date().toISOString(),
      },
    ])
    .select('id')
    .single();

  if (commentError) {
    return NextResponse.json({ error: commentError.message }, { status: 500 });
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
    return NextResponse.json({ error: ratingError.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Review submitted successfully' });
}

// 리뷰 업데이트
export async function PUT(req: Request) {
  const supabase = createClient();
  const body = await req.json();
  const { id, updatedComment } = body;

  if (!id || !updatedComment) {
    return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
  }

  // 댓글 내용 업데이트
  const { error } = await supabase
    .from('comments')
    .update({ content: updatedComment })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Review updated successfully' });
}

// 리뷰 삭제
export async function DELETE(req: Request) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const reviewId = searchParams.get('id');

  if (!reviewId) {
    return NextResponse.json(
      { error: 'Review ID is required' },
      { status: 400 },
    );
  }

  const { error } = await supabase.from('comments').delete().eq('id', reviewId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Review deleted successfully' });
}
