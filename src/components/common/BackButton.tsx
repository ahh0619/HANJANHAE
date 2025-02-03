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
      type="button"
      className={`relative flex h-10 w-10 items-center justify-center ${className}`}
      aria-label="뒤로 가기"
      onClick={() => router.back()}
    >
      <div className="absolute inset-0 rounded-full bg-etc-white" />
      <OptimizedImage
        src="/assets/icons/chevron-left.svg"
        alt="Back"
        className="z-10"
      />
    </button>
  );
};

export default BackButton;
