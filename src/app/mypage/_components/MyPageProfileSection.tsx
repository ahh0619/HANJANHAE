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
  <div className="mt-6 w-full px-4">
    <div className="flex items-center rounded-lg bg-white px-4 py-4">
      {/* 프로필 이미지 */}
      <div className="flex h-16 w-16 items-center overflow-hidden rounded-full">
        <Image
          src={
            userData.profile_image || '/assets/icons/default_profile_image.svg'
          }
          alt="프로필 이미지"
          width={64}
          height={64}
          className="rounded-full object-cover"
        />
      </div>

      {/* 닉네임 */}
      <div className="ml-4 flex flex-col justify-center">
        <p className="text-lg font-semibold">{userData.nickname}</p>
      </div>

      {/* 프로필 수정 버튼 */}
      <button
        onClick={onEditClick}
        className="ml-auto rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
      >
        프로필 수정
      </button>
    </div>
  </div>
);

export default MyPageProfileSection;
