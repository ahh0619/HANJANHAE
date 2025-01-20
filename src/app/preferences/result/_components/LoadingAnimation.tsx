import Lottie from 'react-lottie-player';

import animationData from '../../../../../public/assets/loading-animation.json';

const LoadingAnimation = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Lottie loop animationData={animationData} play className="h-48 w-48" />
      <p className="mt-[32px] text-title-lb text-grayscale-400">
        AI가 분석 중입니다!
      </p>
    </div>
  );
};

export default LoadingAnimation;
