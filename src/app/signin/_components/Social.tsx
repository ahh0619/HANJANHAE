'use client';

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
      <p className="mt-10 text-center text-xl font-bold">SNS 로그인</p>

      <div className="flex justify-center gap-4">
        <div
          className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-sm"
          onClick={() => handleSubmit('google')}
        >
          구글
        </div>
        <div
          className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-sm"
          onClick={() => handleSubmit('kakao')}
        >
          카카오
        </div>
      </div>
    </>
  );
};

export default Social;
