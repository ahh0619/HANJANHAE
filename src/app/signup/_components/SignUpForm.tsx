'use client';
import { useState } from 'react';

import InputData from './InputData';
import TermsData from './TermsData';
import TermsDetail from './TermsDetail';

const SignUpForm = () => {
  const [step, setStep] = useState(1);
  const [isOpenTerms, setIsOpenTerms] = useState(false);

  return (
    <form className="flex flex-col gap-4">
      {step === 1 && !isOpenTerms && <TermsData />}
      {step === 2 && !isOpenTerms && <InputData />}
      {isOpenTerms && <TermsDetail />}
    </form>
  );
};

export default SignUpForm;
