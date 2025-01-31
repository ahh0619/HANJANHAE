import * as Sentry from '@sentry/node';

import { fetchRandomDrinks } from '@/app/actions/drink';

export type RecommendResult = {
  isError: boolean;
  drinks: Awaited<ReturnType<typeof fetchRandomDrinks>>;
};

export const recommendErrorHandler = async (
  error: unknown,
  message: string,
): Promise<RecommendResult> => {
  Sentry.captureException(error);
  console.error(message, error);
  const fallback = await fetchRandomDrinks(5);
  return {
    isError: true,
    drinks: fallback,
  };
};
