'use client';

import { useEffect, useState } from 'react';

import Button from '@/components/auth/Button';
import CheckField from '@/components/auth/CheckField';
import InputField from '@/components/auth/InputField';
import Modal from '@/components/auth/Modal';
import useSignIn from '@/hooks/auth/useSignIn';

const SignInForm = () => {
  const [options, setOptions] = useState({
    save: false,
    remember: false,
  });

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { handleSubmit, register, onSubmit, errors } = useSignIn({
    isSaveEmail: options.save,
    handleError: (message: string) => {
      setErrorMessage(message);
      setIsOpenModal(true);
    },
  });

  useEffect(() => {
    setOptions({ ...options, ['save']: !!localStorage.getItem('user_email') });
  }, []);

  /* 체크 여부 토글 */
  const handleToggleItem = ({ name }: { name: keyof typeof options }) => {
    setOptions({ ...options, [name]: !options[name] });
  };

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
          <CheckField
            id="save"
            label="아이디 저장"
            checked={options.save}
            handleChange={() => handleToggleItem({ name: 'save' })}
          />
          <CheckField
            id="remember"
            label="로그인 정보 저장"
            checked={options.remember}
            handleChange={() => handleToggleItem({ name: 'remember' })}
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
