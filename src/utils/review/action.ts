// 특정 주류에 대한 리뷰 목록 가져오기
export async function fetchReviews(drinkId: string) {
  const response = await fetch(`/api/reviews?drink_id=${drinkId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch reviews');
  }
  return response.json();
}

// 리뷰 등록
export async function submitReview({
  drinkId,
  userId,
  content,
  rating,
  nickname,
}: {
  drinkId: string;
  userId: string;
  content: string;
  rating: number;
  nickname: string;
}) {
  const response = await fetch('/api/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      drinkId,
      userId,
      content,
      rating,
      nickname,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to submit review');
  }

  return response.json();
}

// 리뷰 업데이트
export async function updateReview({
  id,
  updatedComment,
}: {
  id: string;
  updatedComment: string;
}) {
  const response = await fetch(`/api/reviews`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, updatedComment }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update review');
  }

  return response.json();
}

// 리뷰 삭제
export async function deleteReview(id: string) {
  const response = await fetch(`/api/reviews?id=${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete review');
  }

  return response.json();
}
