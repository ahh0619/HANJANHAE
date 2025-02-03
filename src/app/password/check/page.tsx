import MobileOnlyProtectorProvider from '@/components/common/MobilePageGuardProvider';

import Container from '../_components/Container';

const CheckEmail = () => {
  return (
    <div className="relative mx-auto -mb-32 max-w-[384px] px-5">
      <MobileOnlyProtectorProvider redirectUrl="/">
        <Container />
      </MobileOnlyProtectorProvider>
    </div>
  );
};

export default CheckEmail;
