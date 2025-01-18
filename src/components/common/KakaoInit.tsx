'use client';

import { useEffect } from 'react';

import { initializeKakao } from '@/utils/share/shareUtils';

const KakaoInit = () => {
  useEffect(() => {
    initializeKakao();
  }, []);

  return null;
};

export default KakaoInit;
