import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ResetPasswordType } from '@/types/Auth';
import { resetPassword } from '@/utils/auth/action';

type UseResetPasswordProps = {
  token: string;
  handleSuccess: () => void;
};

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty('비밀번호를 입력해 주세요.')
      .regex(
        new RegExp(
          /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/,
        ),
        '영문, 숫자, 특수문자 포함 6 ~ 20자로 입력해 주세요',
      ),
    passwordConfirm: z
      .string()
      .nonempty('비밀번호를 한 번 더 입력해 주세요.')
      .regex(
        new RegExp(
          /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/,
        ),
        '영문, 숫자, 특수문자 포함 6 ~ 20자로 입력해 주세요',
      ),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

const useResetPassword = ({ token, handleSuccess }: UseResetPasswordProps) => {
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
      const user = await resetPassword({ token, password: values.password });

      window.alert('비밀번호 변경 성공');
      console.log('use => ', user);
      handleSuccess();
    } catch (error: any) {
      window.alert(error);
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
