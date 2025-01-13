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
      <div className="flex h-16 w-16 items-center rounded-full">
        <img
          src={userData.profile_image || '/default-avatar.png'}
          alt="프로필 이미지"
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <div className="ml-4 flex flex-col justify-center">
        <p className="text-lg font-semibold">{userData.nickname}</p>
      </div>
      <button
        onClick={onEditClick}
        className="ml-auto rounded bg-gray-200 px-4 py-1 text-sm"
      >
        수정
      </button>
    </div>
  </div>
);

export default MyPageProfileSection;
