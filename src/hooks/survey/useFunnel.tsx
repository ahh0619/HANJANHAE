import React, { Children, ReactElement, useCallback, useState } from 'react';

import { StepProps } from '@/types/surveyTypes';

const Step = ({ children }: StepProps) => {
  return (
    <div className="mx-auto flex w-full max-w-[450px] justify-center">
      {children}
    </div>
  );
};

const Funnel = ({
  children,
  currentStep,
}: {
  children: React.ReactNode;
  currentStep: any;
}) => {
  console.log('funnel!!');
  const steps = Children.toArray(children).filter(
    (child): child is ReactElement<StepProps> => {
      return React.isValidElement(child) && child.type === Step;
    },
  );

  const activeStep = steps.find((child) => child.props.name === currentStep);
  return activeStep || null;
};

const useFunnel = (initialStep: string) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const next = useCallback((nextStep: string) => {
    setCurrentStep(nextStep);
  }, []);

  const prev = useCallback((prevStep: string) => {
    setCurrentStep(prevStep);
  }, []);

  return { Funnel, Step, next, prev, currentStep };
};

export default useFunnel;
