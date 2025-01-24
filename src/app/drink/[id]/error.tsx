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

  return <ErrorComponent reset={reset} />;
};
export default Error;
