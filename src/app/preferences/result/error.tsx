'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

import ErrorComponent from '@/components/common/ErrorComponent';
import { ErrorProps } from '@/types/errorTypes';

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <ErrorComponent
      reset={reset}
      title=""
      message="설문조사를 먼저 진행해주세요"
      showBackButton={false}
      showHomeButton={false}
      showSurveyButton={true}
    />
  );
};

export default Error;
