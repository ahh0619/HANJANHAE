'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

type BackButtonProps = {
  className?: string;
};

const BackButton = ({ className }: BackButtonProps) => {
  const router = useRouter();

  return (
    <button
      className={`flex items-center ${className}`}
      onClick={() => router.back()}
    >
      <Image src="/assets/icons/back.svg" alt="Back" width={40} height={40} />
    </button>
  );
};

export default BackButton;
