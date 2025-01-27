'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Button from '@/components/auth/Button';

import SignUpForm from './SignUpForm';
import TermsDetail from './TermsDetail';

const Container = () => {
  const router = useRouter();

  const [step, setStep] = useState<number>(1);
  const [terms, setTerms] = useState<number | null>(null);

  /* 회원가입 단계 이동 */
  const handleMoveStep = (value: number) => setStep(value);

  /* 이용약관 선택 */
  const handleSelectTerms = (value: number | null) => setTerms(value);

  return (
    <div className="h-[100vh] xl:h-full">
      <Button
        category="back"
        label=""
        handleClick={() => (step === 1 ? router.push('/signin') : setStep(1))}
      />
      <h1 className="mb-8 py-[6px] text-center text-title-xl text-grayscale-900 xl:mb-10 xl:py-0 xl:pt-[18px]">
        회원가입
      </h1>
      {step === 2 && (
        <Button
          category="cancel"
          label="취소"
          handleClick={() => router.push('/signin')}
        />
      )}

      <SignUpForm
        step={step}
        handleMoveStep={handleMoveStep}
        handleSelectTerms={handleSelectTerms}
      />

      {terms && <TermsDetail terms={terms} handleClose={handleSelectTerms} />}
    </div>
  );
};

export default Container;
