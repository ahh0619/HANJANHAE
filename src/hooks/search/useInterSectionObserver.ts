'use client';

import { useEffect, useRef } from 'react';

type UseIntersectionObserverParams = {
  hasNextPage: boolean; // 다음 페이지 존재 여부
  fetchNextPage: () => void; // 다음 페이지 데이터를 가져오는 함수
  threshold?: number; // 옵저버의 교차 임계값 (기본값: 1.0)
};

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
