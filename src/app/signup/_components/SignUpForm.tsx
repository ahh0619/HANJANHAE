'use client';
import { useState } from 'react';

import Information from './Information';
import Terms from './Terms';
import TermsDetail from './TermsDetail';

const SignUpForm = () => {
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
      {step === 1 && !terms && (
        <Terms
          handleMoveStep={handleMoveStep}
          handleSelectTerms={handleSelectTerms}
        />
      )}
      {step === 2 && !terms && <Information />}
      {terms && <TermsDetail terms={terms} handleClose={handleSelectTerms} />}
    </>
  );
};

export default SignUpForm;
