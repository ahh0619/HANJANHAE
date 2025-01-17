'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/auth/Button';

const OptionLink = () => {
  const router = useRouter();

  return (
    <div className="mb-10 flex items-center justify-center gap-1">
      <Button
        category="option"
        label="비밀번호 찾기"
        handleClick={() => router.push('/password/check')}
      />
      <p className="text-label-lm text-grayscale-500">|</p>
      <Button
        category="option"
        label="회원가입"
        handleClick={() => router.push('/signup')}
      />
    </div>
  );
};

export default OptionLink;
