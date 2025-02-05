'use client';

import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import PreferencesSection from '@/app/preferences/customization/_components/PreferencesSection';

import { useModal } from '../providers/ModalProvider';
import MobilePreferencesSection from './_components/MobilePreferencesSection';

const Page = () => {
  const [isMounted, setisMounted] = useState<boolean>(false);
  const isXL = useMediaQuery({ query: '(min-width: 1280px)' });
  const { closeModal } = useModal();

  useEffect(() => {
    setisMounted(true);
  }, []);

  useEffect(() => {
    if (isXL) {
      closeModal();
    }
  }, [isXL]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {isXL ? (
        <PreferencesSection title="내 취향 조사" mode="create" />
      ) : (
        <MobilePreferencesSection />
      )}
    </>
  );
};

export default Page;
