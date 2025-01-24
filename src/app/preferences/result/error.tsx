'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

import { ErrorProps } from '@/types/errorTypes';

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    Sentry.captureException(error);
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      {error.message}
    </div>
  );
};
export default Error;
