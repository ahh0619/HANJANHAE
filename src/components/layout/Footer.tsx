'use client';

import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();

  return pathname !== '/survey' && <div> Footer</div>;
};

export default Footer;
