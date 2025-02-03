import { zodResolver } from '@hookform/resolvers/zod';
import * as Sentry from '@sentry/nextjs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { resetPassword } from '@/app/actions/auth';
import { useAuthStore } from '@/store/authStore';
import { ResetPasswordType } from '@/types/Auth';

type ResetPasswordProps = {
  token: string;
  handleError: (message: string) => void;
};

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty('비밀번호를 입력해주세요.')
      .regex(
        new RegExp(
          /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/,
        ),
        '영문, 숫자, 특수문자 포함 6~20자로 입력해주세요.',
      ),
    passwordConfirm: z.string().nonempty('비밀번호를 한 번 더 입력해주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

const useResetPassword = ({ token, handleError }: ResetPasswordProps) => {
  const { user } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit = async (values: ResetPasswordType) => {
    try {
      await resetPassword({ user, token, password: values.password });
    } catch (error) {
      Sentry.captureException(error);
      handleError('비밀번호 변경에 실패했습니다.');
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

export default useResetPassword;
