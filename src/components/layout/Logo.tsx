import Image from 'next/image';
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="mb-[28.5px] mt-[33.5px] flex items-center justify-center">
      <Image src="/assets/icons/logo.svg" alt="Logo" width={116} height={30} />
    </div>
  );
};

export default Logo;
