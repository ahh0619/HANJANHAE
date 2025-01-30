'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Suspense } from 'react';

import Button from '@/components/auth/Button';

import EmailForm from './EmailForm';
import PasswordForm from './PasswordForm';

const Container = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <Button
        category="back"
        label=""
        handleClick={() =>
          pathname === '/password/reset'
            ? router.push('/password/check')
            : router.push('/mypage')
        }
      />
      <h1 className="mb-8 py-[6px] text-center text-title-xl text-grayscale-900  xl:mb-10 xl:py-0 xl:pt-[18px]">
        비밀번호 재설정
      </h1>

      {pathname === '/password/check' ? (
        <EmailForm />
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <PasswordForm />
        </Suspense>
      )}
    </>
  );
};

export default Container;
