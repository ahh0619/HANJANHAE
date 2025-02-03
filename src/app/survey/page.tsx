'use client';

import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import PreferencesSection from '@/app/preferences/customization/_components/PreferencesSection';

import MobilePreferencesSection from './_components/MobilePreferencesSection';

const Page = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const isXL = useMediaQuery({ query: '(min-width: 1280px)' });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex w-full justify-center">
      {isXL ? (
        <PreferencesSection title="내 취향 조사" mode="create" />
      ) : (
        <MobilePreferencesSection />
      )}
    </div>
  );
};

export default Page;
