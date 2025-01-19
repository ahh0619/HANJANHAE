'use client';

import { useState } from 'react';

import Button from '@/components/auth/Button';
import InputField from '@/components/auth/InputField';
import Modal from '@/components/auth/Modal';
import useCheckEmail from '@/hooks/auth/useCheckEmail';

const EmailForm = () => {
  const [modalMessage, setModalMessage] = useState<string[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { handleSubmit, register, onSubmit, errors } = useCheckEmail({
    handleMessage: (message: string[]) => {
      setModalMessage(message);
      setIsOpenModal(true);
    },
  });

  return (
    <>
      <form className="flex flex-col gap-[100px]" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          id="email"
          label="비밀번호를 찾고자 하는 아이디를 입력해주세요."
          register={register}
          error={errors.email?.message}
        />

        <Button label="다음" />
      </form>

      {isOpenModal && (
        <Modal
          title={modalMessage[0]}
          content={modalMessage[1]}
          button={{ text: '확인', onClick: () => setIsOpenModal(false) }}
        />
      )}
    </>
  );
};

export default EmailForm;
