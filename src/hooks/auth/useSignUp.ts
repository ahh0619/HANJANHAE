import { zodResolver } from '@hookform/resolvers/zod';
import * as Sentry from '@sentry/nextjs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { signup } from '@/app/actions/auth';
import { SignUpDataType } from '@/types/Auth';
import { manageSignUpError } from '@/utils/auth/manageError';

type SignUpProps = {
  isAgreeAll: boolean;
  handleErrorMessage: (message: string[]) => void;
};

const signupSchema = z
  .object({
    email: z
      .string()
      .nonempty('아이디를 입력해주세요.')
      .email('이메일 형식으로 입력해주세요.'),
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
    nickname: z.string().nonempty('닉네임을 입력해주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

const useSignUp = ({ isAgreeAll, handleErrorMessage }: SignUpProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
    },
  });

  const onSubmit = async (values: SignUpDataType) => {
    if (!isAgreeAll) {
      handleErrorMessage([
        '약관 동의는 필수입니다.',
        '모든 항목에 동의해주세요.',
      ]);
      return;
    }

    try {
      await signup(values);
    } catch (error) {
      Sentry.captureException(error);
      handleErrorMessage([
        manageSignUpError(error.message),
        '다시 시도해주세요.',
      ]);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

export default useSignUp;
