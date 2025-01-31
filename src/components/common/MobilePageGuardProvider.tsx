'use client';

import useMobileOnlyProtector from '@/hooks/common/useMobilePageGuard';

const MobileOnlyProtectorProvider = ({ children, redirectUrl = '/' }) => {
  const renderPage = useMobileOnlyProtector(redirectUrl);

  if (!renderPage) {
    return null;
  }

  return <>{children}</>;
};

export default MobileOnlyProtectorProvider;
