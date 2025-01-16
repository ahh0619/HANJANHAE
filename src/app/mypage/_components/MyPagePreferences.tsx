import Image from 'next/image';

const MyPagePreferences = () => (
  <div className="mt-4 flex w-full justify-center px-4">
    <div className="relative h-[72px] w-full">
      <Image
        src="/assets/icons/my_preference_button.svg"
        alt="내 취향 정보 수정 배너"
        layout="fill"
        className="rounded-lg object-cover"
      />
    </div>
  </div>
);

export default MyPagePreferences;
