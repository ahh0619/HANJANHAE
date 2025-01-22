'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Button from '@/components/auth/Button';

import SignUpForm from './SignUpForm';
import Terms from './Terms';
import TermsDetail from './TermsDetail';

const Container = () => {
  const router = useRouter();

  const [step, setStep] = useState<number>(1);
  const [terms, setTerms] = useState<number | null>(null);

  /* 회원가입 단계 이동 */
  const handleMoveStep = (value: number) => {
    setStep(value);
  };

  /* 이용약관 선택 */
  const handleSelectTerms = (value: number | null) => {
    setTerms(value);
  };

  return (
    <>
      <Button
        category="back"
        label=""
        handleClick={() => (step === 1 ? router.push('/signin') : setStep(1))}
      />
      <h1 className="mb-8 py-[6px] text-center text-title-xl text-grayscale-900">
        회원가입
      </h1>
      {step === 2 && (
        <Button
          category="cancel"
          label="취소"
          handleClick={() => router.push('/signin')}
        />
      )}

      {step === 1 && (
        <Terms
          handleMoveStep={handleMoveStep}
          handleSelectTerms={handleSelectTerms}
        />
      )}
      {step === 2 && !terms && <SignUpForm />}
      {terms && <TermsDetail terms={terms} handleClose={handleSelectTerms} />}
    </>
  );
};

export default Container;
