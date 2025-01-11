'use client';

import { FaStar } from 'react-icons/fa';

import { useReviewForm } from '@/hooks/review/useReviewForm';

export type ReviewFormProps = {
  onSubmit: (data: { rating: number; comment: string }) => void;
};

const ReviewForm = ({ onSubmit }: ReviewFormProps) => {
  const {
    rating,
    hoverRating,
    comment,
    errorMessage,
    setRating,
    setHoverRating,
    setComment,
    handleReviewSubmit,
  } = useReviewForm(onSubmit);

  const renderStars = () => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`h-6 w-6 cursor-pointer ${
            star <= (hoverRating || rating)
              ? 'text-yellow-500'
              : 'text-gray-300'
          }`}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ))}
    </div>
  );

  return (
    <form onSubmit={handleReviewSubmit} className="mt-4 space-y-6">
      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium text-gray-700">별점</label>
        {renderStars()}
      </div>
      <div>
        <label
          htmlFor="comment"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          리뷰 내용
        </label>
        <textarea
          name="comment"
          id="comment"
          className="h-24 w-full resize-none rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="최소 2자, 최대 100자"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={101}
          required
        ></textarea>
        {errorMessage && (
          <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-gray-800 py-2 text-sm text-white hover:bg-gray-700"
      >
        등록
      </button>
    </form>
  );
};

export default ReviewForm;
