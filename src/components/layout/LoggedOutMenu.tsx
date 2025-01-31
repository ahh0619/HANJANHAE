import Link from 'next/link';

import OptimizedImage from '../common/OptimizedImage';

const LoggedOutMenu = () => {
  return (
    <div className="flex items-center">
      <Link href="/like" className="flex items-center gap-2 p-3">
        <OptimizedImage src="/assets/icons/header-heart.svg" alt="좋아요" />
        <span className="text-label-mb">좋아요</span>
      </Link>
      <Link href="/signin" className="flex items-center gap-2 p-3">
        <OptimizedImage src="/assets/icons/header-login.svg" alt="로그인" />
        <span className="text-label-mb">로그인</span>
      </Link>
      <Link href="/signup" className="flex items-center p-3">
        <OptimizedImage src="/assets/icons/header-user.svg" alt="회원가입" />
        <span className="text-label-mb">회원가입</span>
      </Link>
    </div>
  );
};

export default LoggedOutMenu;
