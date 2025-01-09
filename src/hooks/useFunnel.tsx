import React, { Children, ReactElement, useState } from 'react';

import { StepProps } from '@/types/surveyTypes';

const useFunnel = (initialStep: string) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const Step = ({ name, children }: StepProps) => {
    return <div>{children}</div>;
  };

  const Funnel = ({ children }: { children: React.ReactNode }) => {
    const steps = Children.toArray(children).filter(
      (child): child is ReactElement<StepProps> =>
        React.isValidElement(child) && child.type === Step,
    );

    const activeStep = steps.find((child) => child.props.name === currentStep);

    return activeStep || null;
  };

  const next = (nextStep: string) => {
    setCurrentStep(nextStep);
  };

  const prev = (prevStep: string) => {
    setCurrentStep(prevStep);
  };

  return { Funnel, Step, next, prev, currentStep };
};

export default useFunnel;
