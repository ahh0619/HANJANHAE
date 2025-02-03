'use client';

import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';

import Button from '@/components/auth/Button';
import ResetPasswordModal from '@/components/auth/ResetPasswordModal';
import useConfirmModal from '@/hooks/auth/useConfirmModal';

const OptionLink = () => {
  const router = useRouter();

  const { isOpenModal, handleOpenModal, handleCloseModal } = useConfirmModal();

  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  return (
    <>
      <div className="mb-10 flex items-center justify-center gap-1">
        <Button
          category="option"
          label="비밀번호 찾기"
          handleClick={() =>
            isDesktop ? handleOpenModal() : router.push('/password/check')
          }
        />
        <p className="text-label-lm text-grayscale-500">|</p>
        <Button
          category="option"
          label="회원가입"
          handleClick={() => router.push('/signup')}
        />
      </div>

      {isOpenModal && <ResetPasswordModal handleClose={handleCloseModal} />}
    </>
  );
};

export default OptionLink;
