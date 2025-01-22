import { createClient } from '@/utils/supabase/client';

const useSocial = () => {
  const supabase = createClient();

  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_URL}/api/auth/social`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) throw new Error(error.message);
  };

  const handleKakao = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_URL}/api/auth/social`,
      },
    });

    if (error) throw new Error(error.message);
  };

  return {
    handleGoogle,
    handleKakao,
  };
};

export default useSocial;
