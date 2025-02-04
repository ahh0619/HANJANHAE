import { Suspense } from 'react';

import HeaderClient from './HeaderClient';

const Header = () => {
  return (
    <Suspense>
      <HeaderClient />
    </Suspense>
  );
};

export default Header;
