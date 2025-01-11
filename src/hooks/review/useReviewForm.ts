import { useEffect, useState } from 'react';

export type ReviewFormData = {
  rating: number;
  comment: string;
};

export const useReviewForm = (onSubmit: (data: ReviewFormData) => void) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateComment = (value: string): string | null => {
    if (value.length > 100) return '100글자까지만 작성할 수 있습니다.';
    return null;
  };

  const handleReviewSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (comment.trim().length < 2) {
      setErrorMessage('리뷰는 최소 2자 이상 입력해야 합니다.');
      return;
    }

    if (rating === 0) {
      setErrorMessage('별점을 선택해주세요.');
      return;
    }

    const error = validateComment(comment);
    if (error) {
      setErrorMessage(error);
      return;
    }

    onSubmit({ rating, comment });
    resetForm();
  };

  const resetForm = () => {
    setRating(0);
    setHoverRating(0);
    setComment('');
    setErrorMessage(null);
  };

  useEffect(() => {
    const error = validateComment(comment);
    if (error !== errorMessage) setErrorMessage(error);
  }, [comment]);

  return {
    rating,
    hoverRating,
    comment,
    errorMessage,
    setRating,
    setHoverRating,
    setComment,
    handleReviewSubmit,
    resetForm,
  };
};
