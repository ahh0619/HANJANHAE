import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuth } from '@/app/providers/AuthProvider';
import { SignInDataType } from '@/types/Auth';
import { manageSignInError } from '@/utils/auth/manageError';

type SignInProps = {
  handleError: (message: string) => void;
};

const signinSchema = z.object({
  email: z
    .string()
    .nonempty('아이디를 입력해주세요.')
    .email('이메일 형식으로 입력해주세요.'),
  password: z.string().nonempty('비밀번호를 입력해주세요.'),
});

const useSignIn = ({ handleError }: SignInProps) => {
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: SignInDataType) => {
    try {
      await login(values);
      router.push('/');
    } catch (error: any) {
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
