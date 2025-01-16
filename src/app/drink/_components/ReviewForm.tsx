'use client';

import { useReviewForm } from '@/hooks/review/useReviewForm';

import ReviewStarRating from './ReviewStarRating';

export type ReviewFormProps = {
  onSubmit: (data: { rating: number; comment: string }) => void;
};

const ReviewForm = ({ onSubmit }: ReviewFormProps) => {
  const {
    rating,
    hoverRating,
    comment,
    errors,
    setRating,
    setHoverRating,
    setComment,
    handleReviewSubmit,
  } = useReviewForm(onSubmit);

  return (
    <form onSubmit={handleReviewSubmit} className="mt-4">
      {/* 별점 섹션 */}
      <div className="flex items-center space-x-2">
        <ReviewStarRating
          rating={rating}
          hoverRating={hoverRating || undefined}
          onClick={(star) => setRating(star)}
          onHover={setHoverRating}
          onHoverEnd={() => setHoverRating(null)}
        />
      </div>
      <div className="h-3">
        {errors.rating && (
          <p className="mt-1 text-xs text-red-500">{errors.rating}</p>
        )}
      </div>

      {/* 리뷰 내용 섹션 */}
      <div className="relative">
        <textarea
          name="comment"
          id="comment"
          className="mt-2 h-28 w-full resize-none rounded-2xl border bg-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="최소 2자, 최대 100자"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={101}
        ></textarea>
        <span className="absolute bottom-9 right-5 text-xs text-gray-500">
          {comment.length}/100
        </span>
        <div className="mt-1 h-3">
          {errors.comment && (
            <p className="text-xs text-red-500">{errors.comment}</p>
          )}
        </div>
      </div>

      {/* 버튼 섹션 */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center space-x-2 rounded-lg bg-primary px-4 py-2 text-sm text-white hover:bg-primary-hover"
        >
          등록
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
