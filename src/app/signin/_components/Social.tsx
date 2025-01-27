'use client';

import * as Sentry from '@sentry/nextjs';
import { useState } from 'react';

import Button from '@/components/auth/Button';
import Modal from '@/components/auth/Modal';
import useSocial from '@/hooks/auth/useSocial';

const Social = () => {
  const { handleGoogle, handleKakao } = useSocial();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleSubmit = async (provider: string) => {
    try {
      provider === 'google' && (await handleGoogle());
      provider === 'kakao' && (await handleKakao());
    } catch (error: any) {
      Sentry.captureException(error);
      setIsOpenModal(true);
    }
  };

  return (
    <>
      <p className="mb-5 text-center text-title-lm">SNS 로그인</p>
      <div className="flex flex-col gap-3 pb-[43px] xl:pb-[220px]">
        <Button
          category="google"
          label="구글로 로그인하기"
          handleClick={() => handleSubmit('google')}
        />
        <Button
          category="kakao"
          label="카카오로 로그인하기"
          handleClick={() => handleSubmit('kakao')}
        />
      </div>

      {isOpenModal && (
        <Modal
          title="소셜 로그인에 실패했습니다."
          content="다시 시도해주세요."
          button={{ text: '확인', onClick: () => setIsOpenModal(false) }}
        />
      )}
    </>
  );
};

export default Social;
