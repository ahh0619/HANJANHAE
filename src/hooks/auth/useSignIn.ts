import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuth } from '@/providers/AuthProvider';
import { SignInDataType } from '@/types/Auth';
import { manageSignInError } from '@/utils/auth/manageError';

const signinSchema = z.object({
  email: z
    .string()
    .nonempty('아이디를 입력해 주세요.')
    .email('유효한 이메일 형식이 아닙니다.'),
  password: z
    .string()
    .nonempty('비밀번호를 입력해 주세요.')
    .regex(
      new RegExp(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/,
      ),
      '영문, 숫자, 특수문자 포함 6 ~ 20자로 입력해 주세요',
    ),
});

const useSignIn = () => {
  const { login } = useAuth();

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
    } catch (error: any) {
      window.alert(manageSignInError(error.message));
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
