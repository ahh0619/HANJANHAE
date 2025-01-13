import { FaStar } from 'react-icons/fa';

type ReviewInfoProps = {
  nickname: string | null;
  createdAt: string | null;
  rating: number;
  profile_image: string | null;
};

const ReviewInfo = ({
  nickname,
  createdAt,
  rating,
  profile_image,
}: ReviewInfoProps) => {
  return (
    <div className="mb-5 flex items-start space-x-4">
      <img
        src={profile_image || '/default-avatar.png'}
        alt={`${nickname || '유저'}의 프로필 이미지`}
        className="h-12 w-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-800">{nickname}</span>
          <span className="text-xs text-gray-500">
            {new Date(createdAt || '').toLocaleDateString('ko-KR', {
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
            })}
          </span>
        </div>
        <div className="mt-1 flex items-center">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={index < rating ? 'text-yellow-500' : 'text-gray-300'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewInfo;
