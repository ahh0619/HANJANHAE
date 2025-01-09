'use client';

import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();

  return !['/signup', '/survey'].includes(pathname) && <div> Footer</div>;
};

export default Footer;
