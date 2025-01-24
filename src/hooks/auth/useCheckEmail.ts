import { zodResolver } from '@hookform/resolvers/zod';
import * as Sentry from '@sentry/nextjs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { sendEmailForResetPassword } from '@/app/actions/auth';
import { CheckEmailType } from '@/types/Auth';

type CheckEmailProps = {
  handleMessage: (message: string[]) => void;
};

const checkEmailSchema = z.object({
  email: z
    .string()
    .nonempty('아이디를 입력해주세요.')
    .email('이메일 형식으로 입력해주세요.'),
});

const useCheckEmail = ({ handleMessage }: CheckEmailProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(checkEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: CheckEmailType) => {
    try {
      await sendEmailForResetPassword(values);
      handleMessage(['메일이 전송되었습니다.', '메일함을 확인해주세요.']);
    } catch (error) {
      Sentry.captureException(error);
      handleMessage(['메일 전송에 실패했습니다.', '다시 시도해주세요.']);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

export default useCheckEmail;
