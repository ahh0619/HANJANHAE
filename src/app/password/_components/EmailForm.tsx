'use client';

import InputField from '@/components/auth/InputField';
import useCheckEmail from '@/hooks/auth/useCheckEmail';

const EmailForm = () => {
  const { handleSubmit, register, onSubmit, errors } = useCheckEmail();

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        id="email"
        label="비밀번호를 찾고자 하는 아이디를 입력해주세요."
        placeholder="아이디를 입력해 주세요."
        register={register}
        error={errors.email?.message}
      />

      <button className="w-full bg-black p-2 font-bold text-white">다음</button>
    </form>
  );
};

export default EmailForm;
