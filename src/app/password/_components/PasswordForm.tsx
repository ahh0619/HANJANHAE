'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import InputField from '@/components/auth/InputField';
import useResetPassword from '@/hooks/auth/useResetPassword';

const PasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('code');

  const { handleSubmit, register, onSubmit, errors } = useResetPassword({
    token,
    handleSuccess: () => router.push('/mypage'),
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        id="password"
        label="비밀번호를 변경해 주세요."
        type="password"
        placeholder="새 비밀번호를 입력해 주세요."
        register={register}
        error={errors.password?.message}
      />

      <InputField
        id="passwordConfirm"
        label="새 비밀번호를 확인해주세요."
        type="password"
        placeholder="새 비밀번호를 한 번 더 입력해 주세요."
        register={register}
        error={errors.passwordConfirm?.message}
      />

      <button className="w-full bg-black p-2 font-bold text-white">다음</button>
    </form>
  );
};

export default PasswordForm;
