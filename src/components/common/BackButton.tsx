'use client';

import { useRouter } from 'next/navigation';

import OptimizedImage from './OptimizedImage';

type BackButtonProps = {
  className?: string;
};

const BackButton = ({ className }: BackButtonProps) => {
  const router = useRouter();

  return (
    <button
      className={`flex items-center p-2 ${className}`}
      onClick={() => router.back()}
    >
      <OptimizedImage src="/assets/icons/chevron-left.svg" alt="Back" />
    </button>
  );
};

export default BackButton;
