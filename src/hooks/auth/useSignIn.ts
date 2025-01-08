import { SignInDataType } from '@/types/Auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

  const onSubmit = (data: SignInDataType) => {
    try {
      console.log('signin data => ', data);
    } catch (error) {
      console.log('signin error');
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
