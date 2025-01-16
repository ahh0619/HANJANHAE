import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { CheckEmailType } from '@/types/Auth';
import { sendEmailForResetPassword } from '@/utils/auth/action';

const checkEmailSchema = z.object({
  email: z
    .string()
    .nonempty('아이디를 입력해 주세요.')
    .email('유효한 이메일 형식이 아닙니다.'),
});

const useCheckEmail = () => {
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
      window.alert('비밀번호 재설정을 위한 메일이 전송되었습니다.');
    } catch (error: any) {
      window.alert('메일 전송에 실패하였습니다.');
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
