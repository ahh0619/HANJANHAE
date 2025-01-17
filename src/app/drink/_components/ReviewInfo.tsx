import Image from 'next/image';

type ReviewInfoProps = {
  nickname: string | null;
  createdAt: string | null;
  rating: number;
  profile_image: string | null;
  editable?: boolean;
  onRatingChange?: (newRating: number) => void;
  canEdit?: boolean;
};

const ReviewInfo = ({
  nickname,
  createdAt,
  rating,
  profile_image,
  editable = false,
  onRatingChange,
  canEdit = false,
}: ReviewInfoProps) => {
  const handleStarClick = (index: number) => {
    if (editable && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  return (
    <div className="flex items-start space-x-4">
      {/* 프로필 이미지 */}
      <div className="relative top-[10px] h-12 w-12 overflow-hidden rounded-full">
        <Image
          src={profile_image || '/assets/icons/default_profile_image.svg'}
          alt={`${nickname || '유저'}의 프로필 이미지`}
          fill
          className="object-cover"
        />
      </div>

      {/* 닉네임, 날짜, 별점 */}
      <div className="flex-1">
        {/* 닉네임 */}
        <p className="text-title-mm text-grayscale-900">
          {nickname || '익명'}
          {canEdit && ' (나)'}
        </p>

        {/* 날짜 */}
        <p className="caption-mm text-grayscale-900">
          {createdAt
            ? new Date(createdAt).toLocaleDateString('ko-KR', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
              })
            : ''}
        </p>

        {/* 별점 */}
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`h-6 w-6 ${editable ? 'cursor-pointer' : ''}`}
              onClick={() => editable && handleStarClick(index)}
            >
              <Image
                src={
                  index < rating
                    ? '/assets/icons/star_pressed.svg'
                    : '/assets/icons/star.svg'
                }
                alt={index < rating ? '채워진 별' : '빈 별'}
                width={24}
                height={24}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewInfo;
