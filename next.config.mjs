import { withSentryConfig } from '@sentry/nextjs';
import nextPwa from 'next-pwa';

/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  staticPageGenerationTimeout: 120,
};

const withPWA = nextPwa({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  sw: 'service-worker.js',
});

nextConfig = withPWA(nextConfig);

const sentryOptions = {
  org: 'hanjanhae',
  project: 'javascript-nextjs',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: true,
  },
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
};

const finalConfig = withSentryConfig(nextConfig, sentryOptions);

export default finalConfig;
