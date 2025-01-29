'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import Button from '@/components/auth/Button';
import ResetPasswordModal from '@/components/auth/ResetPasswordModal';

const OptionLink = () => {
  const router = useRouter();

  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  const [isOpenResetModal, setIsOpenResetModal] = useState<boolean>(false);

  return (
    <>
      <div className="mb-10 flex items-center justify-center gap-1">
        <Button
          category="option"
          label="비밀번호 찾기"
          handleClick={() =>
            isDesktop
              ? setIsOpenResetModal(true)
              : router.push('/password/check')
          }
        />
        <p className="text-label-lm text-grayscale-500">|</p>
        <Button
          category="option"
          label="회원가입"
          handleClick={() => router.push('/signup')}
        />
      </div>

      {isOpenResetModal && (
        <ResetPasswordModal handleClose={() => setIsOpenResetModal(false)} />
      )}
    </>
  );
};

export default OptionLink;
