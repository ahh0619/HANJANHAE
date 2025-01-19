'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Button from '@/components/auth/Button';
import CheckField from '@/components/auth/CheckField';
import Modal from '@/components/auth/Modal';
import useSocial from '@/hooks/auth/useSocial';
import { useAuthStore } from '@/store/authStore';

type TermsProps = {
  handleMoveStep: (value: number) => void;
  handleSelectTerms: (value: number | null) => void;
};

const Terms = ({ handleMoveStep, handleSelectTerms }: TermsProps) => {
  const router = useRouter();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { isSocial, setIsAgree } = useAuthStore();
  const { handleGoogle, handleKakao } = useSocial();

  const [terms, setTerms] = useState({
    adult: false,
    use: false,
    personal: false,
  });

  /* 모두 체크 여부 토글 */
  const handleToggleAll = () => {
    const hasFalse = Object.values(terms).some((value) => value === false);

    setTerms({
      ...terms,
      ['adult']: hasFalse,
      ['use']: hasFalse,
      ['personal']: hasFalse,
    });
  };

  /* 체크 여부 토글 */
  const handleToggleItem = ({ name }: { name: keyof typeof terms }) => {
    setTerms({ ...terms, [name]: !terms[name] });
  };

  /* 다음 단계로 이동 */
  const handleMoveNext = (provider: string) => {
    if (!terms.adult || !terms.use || !terms.personal) {
      setIsOpenModal(true);
    } else {
      setIsAgree(true);
      provider === 'email' && handleMoveStep(2);
      provider === 'google' && handleGoogle({ isSignin: false });
      provider === 'kakao' && handleKakao({ isSignin: false });
    }
  };

  /* 소셜 로그인 완료 */
  const handleFinishSocial = () => {
    if (!terms.adult || !terms.use || !terms.personal) {
      setIsOpenModal(true);
    } else {
      setIsAgree(true);
      router.push('/');
    }
  };

  return (
    <div className="">
      <p className="mb-9 text-body-sm text-grayscale-500">
        한잔해를 이용하시려면 이용약관에 동의해주세요.
      </p>

      <p className="mb-5 text-title-lb text-grayscale-900">
        홈페이지 이용약관 (필수)
      </p>

      <div className="mb-10 flex flex-col gap-1">
        <CheckField
          category="signup"
          id="all"
          label="모두 동의하기"
          checked={terms.adult && terms.use && terms.personal}
          handleChange={handleToggleAll}
        />

        <div className="my-2 h-[1px] bg-grayscale-200"></div>

        <CheckField
          category="signup"
          id="adult"
          label="만 19세 이상 성인"
          checked={terms.adult}
          handleChange={() => handleToggleItem({ name: 'adult' })}
        />

        <div className="flex justify-between">
          <CheckField
            category="signup"
            id="use"
            label="홈페이지 이용약관"
            checked={terms.use}
            handleChange={() => handleToggleItem({ name: 'use' })}
          />
          <Button
            category="detail"
            label="자세히보기"
            handleClick={() => handleSelectTerms(1)}
          />
        </div>

        <div className="flex justify-between">
          <CheckField
            category="signup"
            id="personal"
            label="개인정보수집 및 이용동의"
            checked={terms.personal}
            handleChange={() => handleToggleItem({ name: 'personal' })}
          />
          <Button
            category="detail"
            label="자세히보기"
            handleClick={() => handleSelectTerms(2)}
          />
        </div>
      </div>

      {isSocial ? (
        <Button label="완료" handleClick={handleFinishSocial} />
      ) : (
        <>
          <p className="mb-7 text-center text-title-lm">회원가입 방법 선택</p>
          <div className="mb-10 flex flex-col gap-3">
            <Button
              category="google"
              label="구글로 가입하기"
              handleClick={() => handleMoveNext('google')}
            />
            <Button
              category="kakao"
              label="카카오로 가입하기"
              handleClick={() => handleMoveNext('kakao')}
            />
            <Button
              category="email"
              label="이메일로 가입하기"
              handleClick={() => handleMoveNext('email')}
            />
          </div>
        </>
      )}

      {isOpenModal && (
        <Modal
          title="약관 동의는 필수입니다."
          content="모든 항목에 동의해주세요."
          button={{ text: '확인', onClick: () => setIsOpenModal(false) }}
        />
      )}
    </div>
  );
};

export default Terms;
