import Lottie from 'react-lottie-player';

import animationData from '../../../../../public/assets/loading-animation.json';

const LoadingAnimation = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Lottie loop animationData={animationData} play className="h-48 w-48" />
    </div>
  );
};

export default LoadingAnimation;
