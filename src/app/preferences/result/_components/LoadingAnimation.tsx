import { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';

import animationData from '../../../../../public/assets/loading-animation.json';

const messages = [
  'AI가 분석 중입니다!',
  '추천 리스트를 만드는 중이에요!',
  '어떤 전통주를 기대하시나요?',
  '나에게 맞는 전통주는 무엇일까요?',
  '곧 추천 전통주를 만날 수 있어요!',
];

const LoadingAnimation = () => {
  const [messageIndex, setMessageIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="-mb-32 flex h-lvh flex-col items-center justify-center">
      <Lottie loop animationData={animationData} play className="h-48 w-48" />
      <p className="mt-[32px] text-title-lb text-grayscale-400">
        {messages[messageIndex]}
      </p>
    </div>
  );
};

export default LoadingAnimation;
