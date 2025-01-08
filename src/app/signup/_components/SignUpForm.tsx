'use client';
import { useState } from 'react';
import Information from './Information';
import Terms from './Terms';
import TermsDetail from './TermsDetail';

const SignUpForm = () => {
  const [step, setStep] = useState(2);
  const [isOpenTerms, setIsOpenTerms] = useState(false);

  return (
    <>
      {step === 1 && !isOpenTerms && <Terms />}
      {step === 2 && !isOpenTerms && <Information />}
      {isOpenTerms && <TermsDetail />}
    </>
  );
};

export default SignUpForm;
