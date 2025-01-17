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
  <div className="flex items-center space-x-4 p-2">
    {[1, 2, 3, 4, 5].map((star) => (
      <img
        key={star}
        src={
          star <= (hoverRating || rating)
            ? '/assets/icons/star_pressed.svg'
            : '/assets/icons/star.svg'
        }
        alt={`${star} Star`}
        onClick={() => onClick(star)}
        onMouseEnter={() => onHover?.(star)}
        onMouseLeave={() => onHoverEnd?.()}
        className="h-6 w-6 cursor-pointer"
      />
    ))}
  </div>
);

export default ReviewStarRating;
