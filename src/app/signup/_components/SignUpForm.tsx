'use client';

import Button from '@/components/auth/Button';
import InputField from '@/components/auth/InputField';
import useSignUp from '@/hooks/auth/useSignUp';

const SignUpForm = () => {
  const { handleSubmit, register, onSubmit, errors } = useSignUp();

  return (
    <form className="mb-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-20 flex flex-col gap-6">
        <InputField
          id="email"
          label="아이디"
          register={register}
          error={errors.email?.message}
        />
        <InputField
          id="password"
          label="비밀번호"
          type="password"
          register={register}
          error={errors.password?.message}
        />
        <InputField
          id="passwordConfirm"
          label="비밀번호 확인"
          type="password"
          register={register}
          error={errors.passwordConfirm?.message}
        />
        <InputField
          id="nickname"
          label="닉네임"
          register={register}
          error={errors.nickname?.message}
        />
      </div>

      <Button label="회원가입" />
    </form>
  );
};

export default SignUpForm;
