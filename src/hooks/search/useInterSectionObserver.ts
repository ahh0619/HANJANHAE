'use client';

import { useEffect, useRef } from 'react';

import { UseIntersectionObserverParams } from '@/types/search';

export const useIntersectionObserver = ({
  hasNextPage,
  fetchNextPage,
  threshold = 1.0,
}: UseIntersectionObserverParams) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage(); // 데이터 페칭 함수 호출
        }
      },
      { threshold },
    );

    const currentElement = observerRef.current;
    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement); // 클린업
      }
    };
  }, [fetchNextPage, hasNextPage, threshold]);

  return observerRef;
};
