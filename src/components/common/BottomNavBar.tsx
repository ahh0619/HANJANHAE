'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FaHeart, FaHome, FaSearch, FaUser } from 'react-icons/fa';

const BottomNavBar: React.FC = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/drink/')) {
    return null;
  }

  const navItems = [
    { name: '홈', href: '/', icon: <FaHome />, activeColor: 'text-red-500' },
    {
      name: '검색',
      href: '/search',
      icon: <FaSearch />,
      activeColor: 'text-red-500',
    },
    {
      name: '좋아요',
      href: '/like',
      icon: <FaHeart />,
      activeColor: 'text-red-500',
    },
    {
      name: '마이페이지',
      href: '/mypage',
      icon: <FaUser />,
      activeColor: 'text-red-500',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white shadow-md">
      <ul className="flex items-center justify-between py-2">
        {navItems.map((item) => (
          <li
            key={item.href}
            className="flex flex-1 flex-col items-center text-center"
          >
            <Link
              href={item.href}
              className={`flex flex-col items-center text-sm ${
                pathname === item.href ? item.activeColor : 'text-gray-500'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavBar;
