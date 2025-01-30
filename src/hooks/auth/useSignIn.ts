import { zodResolver } from '@hookform/resolvers/zod';
import * as Sentry from '@sentry/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuth } from '@/app/providers/AuthProvider';
import { SignInDataType } from '@/types/Auth';
import { manageSignInError } from '@/utils/auth/manageError';

type SignInProps = {
  isSaveEmail: boolean;
  handleError: (message: string) => void;
};

const signinSchema = z.object({
  email: z
    .string()
    .nonempty('아이디를 입력해주세요.')
    .email('이메일 형식으로 입력해주세요.'),
  password: z.string().nonempty('비밀번호를 입력해주세요.'),
});

const useSignIn = ({ isSaveEmail, handleError }: SignInProps) => {
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    setValue('email', localStorage.getItem('user_email') || '');
  }, [setValue]);

  const onSubmit = async (values: SignInDataType) => {
    isSaveEmail
      ? localStorage.setItem('user_email', values.email)
      : localStorage.removeItem('user_email');

    try {
      await login(values);
      window.location.href = '/';
    } catch (error) {
      Sentry.captureException(error);
      handleError(manageSignInError(error.message));
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

export default useSignIn;
