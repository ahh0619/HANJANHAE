import Image from 'next/image';

type MyPageProfileSectionProps = {
  userData: {
    nickname: string;
    profile_image: string | null;
  };
  onEditClick: () => void;
};

const MyPageProfileSection: React.FC<MyPageProfileSectionProps> = ({
  userData,
  onEditClick,
}) => (
  <div className="mt-8 w-full">
    <div className="flex items-center rounded-lg bg-etc-white px-5">
      {/* 프로필 이미지 */}
      <div className="flex h-20 w-20 items-center overflow-hidden rounded-full">
        <Image
          src={
            userData.profile_image || '/assets/icons/default_profile_image.svg'
          }
          alt="프로필 이미지"
          width={80}
          height={80}
          className="rounded-full object-cover"
        />
      </div>

      {/* 닉네임 */}
      <div className="ml-6 flex flex-col justify-center">
        <p className="max-w-[142px] truncate text-title-lb text-grayscale-900">
          {userData.nickname}
        </p>
      </div>

      {/* 프로필 수정 버튼 */}
      <button
        onClick={onEditClick}
        className="ml-auto rounded-lg border border-primary px-4 py-2 text-label-mm text-primary"
      >
        프로필 수정
      </button>
    </div>
  </div>
);

export default MyPageProfileSection;
