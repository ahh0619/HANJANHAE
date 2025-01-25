import React from 'react';

import OptimizedImage from '../common/OptimizedImage';

const Logo: React.FC = () => {
  return (
    <div className="mb-[28.5px] mt-[33.5px] block flex items-center justify-center xl:hidden">
      <OptimizedImage
        src="/assets/icons/logo.svg"
        alt="Logo"
        width={116}
        height={30}
      />
    </div>
  );
};

export default Logo;
