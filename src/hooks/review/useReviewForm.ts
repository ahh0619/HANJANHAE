import { useState } from 'react';

export type ReviewFormData = {
  rating: number;
  comment: string;
};

export const useReviewForm = (onSubmit: (data: ReviewFormData) => void) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');

  const isFormValid = rating > 0 && comment.trim().length >= 2;

  const handleReviewSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) return;

    onSubmit({ rating, comment });
    resetForm();
  };

  const resetForm = () => {
    setRating(0);
    setHoverRating(null);
    setComment('');
  };

  return {
    rating,
    hoverRating,
    comment,
    isFormValid,
    setRating,
    setHoverRating,
    setComment,
    handleReviewSubmit,
    resetForm,
  };
};
