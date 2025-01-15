import { useEffect, useState } from 'react';

export type ReviewFormData = {
  rating: number;
  comment: string;
};

export const useReviewForm = (onSubmit: (data: ReviewFormData) => void) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');
  const [isCommentTouched, setIsCommentTouched] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string | null>>({
    rating: null,
    comment: null,
  });

  const validateForm = () => {
    const newErrors: Record<string, string | null> = {
      rating: null,
      comment: null,
    };
    if (!rating) newErrors.rating = '별점을 입력해주세요.';
    if (!isCommentTouched && comment.trim().length === 0) {
      newErrors.comment = '리뷰는 최소 2자 이상 입력해야 합니다.';
    } else if (comment.trim().length < 2) {
      newErrors.comment = '리뷰는 최소 2자 이상 입력해야 합니다.';
    } else if (comment.length > 100) {
      newErrors.comment = '100글자까지만 작성할 수 있습니다.';
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === null);
  };

  const handleReviewSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      onSubmit({ rating, comment });
      resetForm();
    }
  };

  const resetForm = () => {
    setRating(0);
    setHoverRating(null);
    setComment('');
    setIsCommentTouched(false);
    setErrors({ rating: null, comment: null });
  };

  const validateComment = () => {
    if (!isCommentTouched) return;
    if (comment.trim().length === 0) {
      setErrors((prev) => ({
        ...prev,
        comment: '리뷰는 최소 2자 이상 입력해야 합니다.',
      }));
    } else if (comment.trim().length < 2) {
      setErrors((prev) => ({
        ...prev,
        comment: '리뷰는 최소 2자 이상 입력해야 합니다.',
      }));
    } else if (comment.length > 100) {
      setErrors((prev) => ({
        ...prev,
        comment: '100글자까지만 작성할 수 있습니다.',
      }));
    } else {
      setErrors((prev) => ({ ...prev, comment: null }));
    }
  };

  useEffect(() => {
    validateComment();
  }, [comment, isCommentTouched]);

  useEffect(() => {
    if (rating > 0) {
      setErrors((prev) => ({ ...prev, rating: null }));
    }
  }, [rating]);

  return {
    rating,
    hoverRating,
    comment,
    errors,
    setRating,
    setHoverRating,
    setComment: (value: string) => {
      if (!isCommentTouched) setIsCommentTouched(true);
      setComment(value);
    },
    handleReviewSubmit,
    resetForm,
  };
};
