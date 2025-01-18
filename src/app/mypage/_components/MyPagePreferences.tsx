import Image from 'next/image';
import Link from 'next/link';

const MyPagePreferences = () => (
  <div className="mt-8 flex w-full justify-center px-5">
    {/* 배너 전체 */}
    <Link
      href="/preferences/customization"
      className="relative flex h-[72px] w-full items-center rounded-xl bg-gradient-banner hover:opacity-90"
    >
      {/* 왼쪽 아이콘 및 텍스트 */}
      <div className="flex items-center">
        <Image
          src="/assets/icons/my_preference_button_image1.svg"
          alt="소주잔 아이콘"
          width={48}
          height={48}
        />
        <span className="ml-4 text-label-lm text-etc-white">
          내 취향 정보 수정
        </span>
      </div>

      {/* 오른쪽 아이콘 */}
      <div className="absolute right-2 top-[43px] -translate-y-1/2 transform">
        <Image
          src="/assets/icons/my_preference_button_image2.svg"
          alt="서류 아이콘"
          width={57}
          height={72}
        />
      </div>
    </Link>
  </div>
);

export default MyPagePreferences;
