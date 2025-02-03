'use client';

import { useState } from 'react';

import Button from '@/components/auth/Button';
import CheckField from '@/components/auth/CheckField';
import ConfirmModal from '@/components/auth/ConfirmModal';
import InputField from '@/components/auth/InputField';
import useConfirmModal from '@/hooks/auth/useConfirmModal';
import useSignUp from '@/hooks/auth/useSignUp';

type SignUpFormProps = {
  step: number;
  handleMoveStep: (value: number) => void;
  handleSelectTerms: (value: number | null) => void;
};

const SignUpForm = ({
  step,
  handleMoveStep,
  handleSelectTerms,
}: SignUpFormProps) => {
  const { isOpenModal, handleOpenModal, handleCloseModal } = useConfirmModal();

  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [terms, setTerms] = useState({ use: false, personal: false });

  /* 모두 체크 여부 토글 */
  const handleToggleAll = () => {
    const hasFalse = Object.values(terms).some((value) => value === false);

    setTerms({
      ...terms,
      ['use']: hasFalse,
      ['personal']: hasFalse,
    });
  };

  /* 체크 여부 토글 */
  const handleToggleTerm = ({ name }: { name: keyof typeof terms }) => {
    setTerms({ ...terms, [name]: !terms[name] });
  };

  /* 다음 단계로 이동 */
  const handleMoveNext = () => {
    if (!terms.use || !terms.personal) {
      setErrorMessage(['약관 동의는 필수입니다.', '모든 항목에 동의해주세요.']);
      handleOpenModal();
    } else {
      handleMoveStep(2);
    }
  };

  const handleErrorMessage = (message: string[]) => {
    setErrorMessage(message);
    handleOpenModal();
  };

  const { handleSubmit, register, onSubmit, errors } = useSignUp({
    isAgreeAll: terms.use && terms.personal,
    handleErrorMessage,
  });

  return (
    <>
      <div className={`${step === 1 ? 'inline' : 'hidden'} xl:inline`}>
        <p className="mb-9 text-body-sm text-grayscale-500">
          한잔해를 이용하시려면 이용약관에 동의해주세요.
        </p>

        <p className="mb-5 text-title-lb text-grayscale-900">
          이용약관 동의 (필수)
        </p>

        <div className="flex flex-col gap-1">
          <CheckField
            id="all"
            label="모두 동의하기"
            checked={terms.use && terms.personal}
            handleChange={handleToggleAll}
          />

          <div className="relative my-2">
            <div className="absolute left-[-20px] right-[-20px] h-[1px] bg-grayscale-200"></div>
          </div>

          <div className="flex justify-between">
            <CheckField
              id="use"
              label="홈페이지 이용약관"
              checked={terms.use}
              handleChange={() => handleToggleTerm({ name: 'use' })}
            />
            <Button
              category="detail"
              label="자세히보기"
              handleClick={() => handleSelectTerms(1)}
            />
          </div>

          <div className="flex justify-between">
            <CheckField
              id="personal"
              label="개인정보수집 및 이용동의"
              checked={terms.personal}
              handleChange={() => handleToggleTerm({ name: 'personal' })}
            />
            <Button
              category="detail"
              label="자세히보기"
              handleClick={() => handleSelectTerms(2)}
            />
          </div>
        </div>

        <div className="absolute bottom-16 -mx-5 w-full px-5 xl:hidden">
          <Button label="다음" handleClick={handleMoveNext} />
        </div>
      </div>

      <div className="h-0 xl:h-[52px]" />

      <form
        className={`${step === 2 ? 'inline' : 'hidden'} xl:inline`}
        onSubmit={handleSubmit(onSubmit)}
      >
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

        <div className="absolute bottom-16 -mx-5 w-full px-5 xl:static xl:mx-0 xl:px-0 xl:pb-[220px]">
          <Button label="회원가입" />
        </div>
      </form>

      {isOpenModal && (
        <ConfirmModal
          title={errorMessage[0]}
          content={errorMessage[1]}
          button={{ text: '확인', onClick: () => handleCloseModal }}
        />
      )}
    </>
  );
};

export default SignUpForm;
