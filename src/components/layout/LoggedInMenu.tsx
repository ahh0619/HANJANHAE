import Link from 'next/link';

import OptimizedImage from '@/components/common/OptimizedImage';

const LoggedInMenu = () => {
  return (
    <div className="flex items-center">
      <Link href="/like" className="flex items-center gap-2 p-3">
        <OptimizedImage src="/assets/icons/header-heart.svg" alt="좋아요" />
        <span className="text-label-mb">좋아요</span>
      </Link>
      <Link href="/mypage" className="flex items-center p-3">
        <OptimizedImage src="/assets/icons/header-user.svg" alt="마이페이지" />
        <span className="text-label-mb">마이페이지</span>
      </Link>
    </div>
  );
};

export default LoggedInMenu;
