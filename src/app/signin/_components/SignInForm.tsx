'use client';

import { useState } from 'react';

import Button from '@/components/auth/Button';
import CheckField from '@/components/auth/CheckField';
import InputField from '@/components/auth/InputField';
import Modal from '@/components/auth/Modal';
import useSignIn from '@/hooks/auth/useSignIn';

const SignInForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { handleSubmit, register, onSubmit, errors } = useSignIn({
    handleError: (message: string) => {
      setErrorMessage(message);
      setIsOpenModal(true);
    },
  });

  return (
    <>
      <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 flex flex-col gap-2">
          <InputField
            id="email"
            label="아이디"
            register={register}
            error={errors.email?.message}
          />
          <InputField
            id="password"
            label="비밀번호"
            type="password"
            register={register}
            error={errors.password?.message}
          />
        </div>

        <div className="mb-9 flex gap-8">
          <CheckField category="signin" id="save" label="아이디 저장" />
          <CheckField
            category="signin"
            id="remember"
            label="로그인 정보 저장"
          />
        </div>

        <Button label="로그인" />
      </form>

      {isOpenModal && (
        <Modal
          title={errorMessage}
          content="다시 시도해주세요."
          button={{ text: '확인', onClick: () => setIsOpenModal(false) }}
        />
      )}
    </>
  );
};

export default SignInForm;
