import { Star } from 'lucide-react';

type ReviewInfoProps = {
  nickname: string | null;
  createdAt: string | null;
  rating: number;
  profile_image: string | null;
  editable?: boolean;
  onRatingChange?: (newRating: number) => void;
};

const ReviewInfo = ({
  nickname,
  createdAt,
  rating,
  profile_image,
  editable = false,
  onRatingChange,
}: ReviewInfoProps) => {
  const handleStarClick = (index: number) => {
    if (editable && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  return (
    <div className="flex items-start space-x-4">
      {/* 프로필 이미지 */}
      <img
        src={profile_image || '/default-avatar.png'}
        alt={`${nickname || '유저'}의 프로필 이미지`}
        className="h-14 w-14 rounded-full border border-gray-300 object-cover"
      />

      {/* 닉네임, 별점, 날짜 */}
      <div className="flex-1">
        {/* 닉네임 */}
        <p className="text-sm font-bold text-gray-800">{nickname}</p>

        {/* 별점 */}
        <div className="mt-1 flex items-center space-x-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`h-5 w-5 ${
                editable ? 'cursor-pointer hover:scale-110' : ''
              }`}
              fill={index < rating ? '#FBBF24' : 'none'}
              stroke="#FBBF24"
              strokeWidth={1.5}
              onClick={() => handleStarClick(index)}
            />
          ))}
        </div>

        {/* 날짜 */}
        <div className="mt-1">
          <p className="text-xs text-gray-500">
            {new Date(createdAt || '').toLocaleDateString('ko-KR', {
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewInfo;
