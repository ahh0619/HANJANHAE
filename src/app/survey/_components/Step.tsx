interface StepProps {
  name: string;
  currentStep: string;
  children: React.ReactNode;
}

const Step = ({ name, currentStep, children }: StepProps) => {
  return name === currentStep ? <>{children}</> : null;
};

export default Step;
