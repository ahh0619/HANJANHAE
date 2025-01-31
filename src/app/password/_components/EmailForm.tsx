'use client';

import { useState } from 'react';

import Button from '@/components/auth/Button';
import InputField from '@/components/auth/InputField';
import Modal from '@/components/auth/Modal';
import useCheckEmail from '@/hooks/auth/useCheckEmail';

type EmailFormProps = {
  isModal?: boolean;
  handleClose?: () => void;
};

const EmailForm = ({ isModal, handleClose }: EmailFormProps) => {
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
      <form
        className={`flex flex-col pb-10 xl:pb-0 ${isModal ? 'gap-5' : 'gap-[100px]'}`}
        onSubmit={handleSubmit(onSubmit)}
      >
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
          button={{
            text: '확인',
            onClick: () => {
              setIsOpenModal(false);
              handleClose && handleClose();
            },
          }}
        />
      )}
    </>
  );
};

export default EmailForm;
