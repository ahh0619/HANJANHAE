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
      className={`flex items-center py-2 ${className}`}
      onClick={() => router.back()}
    >
      <Image
        src="/assets/icons/chevron-left.svg"
        alt="Back"
        width={24}
        height={24}
      />
    </button>
  );
};

export default BackButton;
