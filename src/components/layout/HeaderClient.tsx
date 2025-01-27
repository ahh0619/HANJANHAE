'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useAuthStore } from '@/store/authStore';

import LoggedInMenu from './LoggedInMenu';
import LoggedOutMenu from './LoggedOutMenu';
import Logo from './Logo';

const HeaderClient = () => {
  const user = useAuthStore();
  const pathname = usePathname();
  const isActive = (href: string) => href === pathname;

  return (
    <header className="mx-auto hidden h-[102px] w-[1200px] items-center justify-between px-10 xl:flex">
      <div className="flex items-center gap-[62px]">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="flex items-center gap-2">
          {/* AI 전통주 추천 목록 */}
          <Link
            href="/preferences/result"
            className={`border-b-2 px-3 py-2 text-label-lm transition-colors ${
              isActive('/preferences/result')
                ? 'border-primary text-primary'
                : 'border-transparent text-grayscale-900 hover:border-grayscale-900'
            } `}
          >
            AI 전통주 추천 목록
          </Link>

          {/* 전통주 검색 */}
          <Link
            href="/search"
            className={`border-b-2 px-3 py-2 text-label-lm transition-colors ${
              isActive('/search')
                ? 'border-primary text-primary'
                : 'border-transparent text-grayscale-900 hover:border-grayscale-900'
            } `}
          >
            전통주 검색
          </Link>
        </nav>
      </div>
      {user ? <LoggedInMenu /> : <LoggedOutMenu />}
    </header>
  );
};

export default HeaderClient;
