'use client';

import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();

  return (
    !['/signup', '/signin', '/survey'].includes(pathname) && <div> Footer</div>
  );
};

export default Footer;
