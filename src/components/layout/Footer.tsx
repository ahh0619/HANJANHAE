'use client';

import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();

  if (
    ['/signup', '/signin', '/survey'].includes(pathname) ||
    pathname.startsWith('/password') ||
    pathname.startsWith('/place')
  ) {
    return null;
  }

  return <div> Footer</div>;
};

export default Footer;
