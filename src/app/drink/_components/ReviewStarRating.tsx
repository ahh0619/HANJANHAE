import { FaStar } from 'react-icons/fa';

type ReviewStarRatingProps = {
  rating: number;
  hoverRating?: number;
  onClick: (rating: number) => void;
  onHover?: (rating: number) => void;
  onHoverEnd?: () => void;
};

const ReviewStarRating = ({
  rating,
  hoverRating,
  onClick,
  onHover,
  onHoverEnd,
}: ReviewStarRatingProps) => (
  <div className="flex items-center space-x-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <FaStar
        key={star}
        className={`h-6 w-6 cursor-pointer ${
          star <= (hoverRating || rating) ? 'text-yellow-500' : 'text-gray-300'
        }`}
        onClick={() => onClick(star)}
        onMouseEnter={() => onHover?.(star)}
        onMouseLeave={() => {
          if (!rating) onHoverEnd?.(); // 클릭되지 않은 상태에서만 hover 초기화
        }}
      />
    ))}
  </div>
);

export default ReviewStarRating;
