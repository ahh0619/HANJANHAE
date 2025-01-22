'use client';

import { useState } from 'react';

import Button from '@/components/auth/Button';
import InputField from '@/components/auth/InputField';
import Modal from '@/components/auth/Modal';
import useSignUp from '@/hooks/auth/useSignUp';

const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { handleSubmit, register, onSubmit, errors } = useSignUp({
    handleError: (message: string) => {
      setErrorMessage(message);
      setIsOpenModal(true);
    },
  });

  return (
    <>
      <form className="mb-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-20 flex flex-col gap-6">
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
          <InputField
            id="passwordConfirm"
            label="비밀번호 확인"
            type="password"
            register={register}
            error={errors.passwordConfirm?.message}
          />
          <InputField
            id="nickname"
            label="닉네임"
            register={register}
            error={errors.nickname?.message}
          />
        </div>

        <div className="absolute bottom-16 -mx-5 w-full px-5">
          <Button label="회원가입" />
        </div>
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

export default SignUpForm;
