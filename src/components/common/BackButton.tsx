'use client';

import { useRouter } from 'next/navigation';

type BackButtonProps = {
  className?: string;
};

const BackButton = ({ className }: BackButtonProps) => {
  const router = useRouter();

  return (
    <button
      className={`text-lg ${className}`}
      onClick={() => router.back()} // 뒤로가기 기능
    >
      {'<'}
    </button>
  );
};

export default BackButton;
