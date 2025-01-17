'use client';

import Button from '@/components/auth/Button';
import useSocial from '@/hooks/auth/useSocial';

const Social = () => {
  const { handleGoogle, handleKakao } = useSocial();

  const handleSubmit = async (provider: string) => {
    try {
      provider === 'google' && (await handleGoogle({ isSignin: true }));
      provider === 'kakao' && (await handleKakao({ isSignin: true }));
    } catch (error: any) {
      window.alert(error);
    }
  };

  return (
    <>
      <p className="mb-5 text-center text-title-lm">SNS 로그인</p>
      <div className="mb-10 flex flex-col gap-3">
        <Button
          category="google"
          label="구글로 로그인하기"
          handleClick={() => handleSubmit('google')}
        />
        <Button
          category="kakao"
          label="카카오로 로그인하기"
          handleClick={() => handleSubmit('kakao')}
        />
      </div>
    </>
  );
};

export default Social;
