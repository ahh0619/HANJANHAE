import { Star } from 'lucide-react';

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
      <Star
        key={star}
        onClick={() => onClick(star)}
        onMouseEnter={() => onHover?.(star)}
        onMouseLeave={() => onHoverEnd?.()}
        className={`h-8 w-8 cursor-pointer ${
          star <= (hoverRating || rating)
            ? 'fill-etc-yellow text-etc-yellow'
            : 'text-etc-yellow fill-none'
        }`}
        fill={star <= (hoverRating || rating) ? 'currentColor' : 'none'}
      />
    ))}
  </div>
);

export default ReviewStarRating;
