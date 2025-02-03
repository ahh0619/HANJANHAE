import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Swiper as SwiperClass } from 'swiper';

export const useProgressbar = (swiperRef: React.RefObject<SwiperClass>) => {
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const onMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleProgress(e);
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      handleProgress(e);
    },
    [isDragging],
  );

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleProgress = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!swiperRef.current) return;
      const swiper = swiperRef.current;

      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;

      const ratio = clickX / width;
      const totalSlides = swiper.slides.length;
      const targetIndex = Math.floor(ratio * (totalSlides - 1));

      swiper.slideTo(targetIndex);
    },
    [swiperRef],
  );

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  return {
    progressBarRef,
    isDragging,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};
