'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

import ErrorComponent from '@/components/common/ErrorComponent';

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    Sentry.captureException(error);
    console.error('Global Error:', error);
  }, [error]);

  return (
    <html lang="ko">
      <body className="flex min-h-screen items-center justify-center">
        <ErrorComponent reset={reset} />
      </body>
    </html>
  );
};

export default GlobalError;
