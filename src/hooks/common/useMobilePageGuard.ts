import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useMobileOnlyProtector = (redirectUrl = '/') => {
  const router = useRouter();
  const [renderPage, setRenderPage] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 1280) {
      router.replace(redirectUrl);
    } else {
      setRenderPage(true);
    }

    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        router.replace(redirectUrl);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [router, redirectUrl]);

  return renderPage;
};

export default useMobileOnlyProtector;
