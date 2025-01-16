'use client';
import { useRouter } from 'next/navigation';

import InputField from '@/components/auth/InputField';
import useSignIn from '@/hooks/auth/useSignIn';

const SignInForm = () => {
  const router = useRouter();

  const { handleSubmit, register, onSubmit, errors } = useSignIn();

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

      {/* 아이디 저장 */}
      <div className="flex items-center justify-end gap-1">
        <input type="checkbox" id="save" />
        <label className="text-sm" htmlFor="password">
          아이디 저장
        </label>
      </div>

      <button className="w-full bg-black p-2 font-bold text-white">
        로그인
      </button>

      <div className="flex justify-center gap-2">
        <p
          className="cursor-pointer text-sm text-gray-500"
          onClick={() => router.push('/password/check')}
        >
          비밀번호 찾기
        </p>
        <p className="cursor-pointer text-sm text-gray-500">|</p>
        <p
          className="cursor-pointer text-sm text-gray-500"
          onClick={() => router.push('/signup')}
        >
          회원가입
        </p>
      </div>
    </form>
  );
};

export default SignInForm;
