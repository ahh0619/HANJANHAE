'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/auth/Button';

import OptionLink from './OptionLink';
import SignInForm from './SignInForm';
import Social from './Social';

const Container = () => {
  const router = useRouter();

  return (
    <>
      <Button category="back" label="" handleClick={() => router.push('/')} />
      <h1 className="mb-12 py-[6px] text-center text-title-xl text-grayscale-900 xl:mb-16 xl:py-0 xl:pt-[18px]">
        로그인
      </h1>
      <SignInForm />
      <OptionLink />
      <Social />
    </>
  );
};

export default Container;
