'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

import ErrorComponent from '@/components/common/ErrorComponent';
import { ErrorProps } from '@/types/errorTypes';

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    Sentry.captureException(error);
    console.error(error);
  }, [error]);

  return <ErrorComponent reset={reset} message={`검색 결과를 찾는 중 오류가 발생했습니다.`} />;
};
export default Error;
