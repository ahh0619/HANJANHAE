'use client';

import { useRouter } from 'next/navigation';

import InputField from '@/components/auth/InputField';
import useSignUp from '@/hooks/auth/useSignUp';

const Information = () => {
  const router = useRouter();

  const { handleSubmit, register, onSubmit, errors } = useSignUp({
    handleSuccess: () => router.push('/signin'),
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        id="email"
        label="아이디"
        placeholder="아이디를 입력해 주세요."
        register={register}
        error={errors.email?.message}
      />

      <InputField
        id="password"
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해 주세요."
        register={register}
        error={errors.password?.message}
      />

      <InputField
        id="passwordConfirm"
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 한 번 더 입력해 주세요."
        register={register}
        error={errors.passwordConfirm?.message}
      />

      <InputField
        id="nickname"
        label="닉네임"
        placeholder="닉네임을 입력해 주세요."
        register={register}
        error={errors.nickname?.message}
      />

      <InputField
        id="birth"
        label="생년월일"
        placeholder="생년월일을 입력해 주세요."
        register={register}
        error={errors.birth?.message}
      />

      <button
        type="submit"
        className="w-full bg-black p-2 font-bold text-white"
      >
        회원가입
      </button>
    </form>
  );
};

export default Information;
