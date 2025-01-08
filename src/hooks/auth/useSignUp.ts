import { SignUpDataType } from '@/types/Auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const signupSchema = z
  .object({
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
    passwordConfirm: z
      .string()
      .nonempty('비밀번호를 한 번 더 입력해 주세요.')
      .regex(
        new RegExp(
          /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/,
        ),
        '영문, 숫자, 특수문자 포함 6 ~ 20자로 입력해 주세요',
      ),
    nickname: z.string().nonempty('닉네임을 입력해 주세요.'),
    birth: z
      .string()
      .nonempty('생년월일을 입력해 주세요.')
      .regex(
        new RegExp(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/),
        'YYYY-MM-DD 형태로 입력해 주세요.',
      ),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

const useSignUp = () => {
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
      birth: '',
    },
  });

  const onSubmit = (data: SignUpDataType) => {
    try {
      console.log('signup data => ', data);
    } catch (error) {
      console.log('signup error');
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
