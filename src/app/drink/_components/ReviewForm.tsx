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
    isFormValid,
    setRating,
    setHoverRating,
    setComment,
    handleReviewSubmit,
  } = useReviewForm(onSubmit);

  return (
    <form onSubmit={handleReviewSubmit} className="mt-6">
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

      {/* 리뷰 내용 섹션 */}
      <div className="relative mt-4">
        <textarea
          name="comment"
          id="comment"
          className="h-[100px] w-full resize-none rounded-2xl border bg-grayscale-100 p-4 text-body-mm text-grayscale-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="리뷰를 남겨주세요."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={101}
        ></textarea>
        <span className="absolute bottom-7 right-4 text-caption-mm text-grayscale-600">
          {comment.length}/100
        </span>
      </div>

      {/* 등록 버튼 */}
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          disabled={!isFormValid}
          className={
            !isFormValid
              ? 'flex items-center space-x-2 rounded-lg bg-grayscale-200 px-4 py-2 text-label-mb text-etc-white'
              : 'flex items-center space-x-2 rounded-lg bg-primary px-4 py-2 text-label-mb text-etc-white hover:bg-primary-hover'
          }
        >
          등록
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
