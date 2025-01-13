import { useAuthStore } from '@/store/authStore';
import { createClient } from '@/utils/supabase/client';

type SocialProps = {
  isSignin: boolean;
};

type AgreeProps = {
  userId: string;
  isAgree: boolean;
  onAgree: () => void;
  onDisagree: () => void;
};

const useSocial = () => {
  const { user, setUser, setIsSocial } = useAuthStore();

  const supabase = createClient();

  const handleGoogle = async ({ isSignin }: SocialProps) => {
    setIsSocial(isSignin);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) throw new Error(error.message);
  };

  const handleKakao = async ({ isSignin }: SocialProps) => {
    setIsSocial(isSignin);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
      },
    });

    if (error) throw new Error(error.message);
  };

  const handleAgree = async ({
    userId,
    isAgree,
    onAgree,
    onDisagree,
  }: AgreeProps) => {
    console.log('handleAgree => ', isAgree);
    console.log('handleAgree => ', user);
    if (isAgree) {
      const { data, error } = await supabase
        .from('users')
        .update({
          agree_terms: true,
        })
        .eq('id', userId)
        .select('id, nickname, profile_image, agree_terms')
        .single();

      if (error) throw new Error(error.message);

      setUser(data);

      onAgree();
    } else {
      onDisagree();
    }
  };

  return {
    handleGoogle,
    handleKakao,
    handleAgree,
  };
};

export default useSocial;
