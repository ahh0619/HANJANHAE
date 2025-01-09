'use client';
import { useState } from 'react';

type TermsProps = {
  handleMoveStep: (value: number) => void;
  handleSelectTerms: (value: number | null) => void;
};

const Terms = ({ handleMoveStep, handleSelectTerms }: TermsProps) => {
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
  const handleMoveNext = () => {
    if (!terms.adult || !terms.use || !terms.personal) {
      window.alert('모든 항목에 동의해 주세요.');
    } else {
      handleMoveStep(2);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-500">
        마주하다를 이용하시려면 이용약관에 동의해주세요.
      </p>

      <p className="mt-8 text-xl font-bold">홈페이지 이용약관 (필수)</p>

      {/* 모두 동의 */}
      <div className="flex items-center gap-1">
        <input
          type="checkbox"
          id="all"
          checked={terms.adult && terms.use && terms.personal}
          onChange={handleToggleAll}
        />
        <label className="cursor-pointer" htmlFor="all">
          모두 동의하기
        </label>
      </div>

      <hr />

      {/* 만 19세 이상 성인 */}
      <div className="flex items-center gap-1">
        <input
          type="checkbox"
          id="adult"
          checked={terms.adult}
          onChange={() => handleToggleItem({ name: 'adult' })}
        />
        <label className="cursor-pointer" htmlFor="adult">
          만 19세 이상 성인
        </label>
      </div>

      {/* 홈페이지 이용약관 */}
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <input
            type="checkbox"
            id="term"
            checked={terms.use}
            onChange={() => handleToggleItem({ name: 'use' })}
          />
          <label className="cursor-pointer" htmlFor="term">
            홈페이지 이용약관
          </label>
        </div>
        <p className="cursor-pointer" onClick={() => handleSelectTerms(1)}>
          자세히보기 &#62;
        </p>
      </div>

      {/* 개인정보 수집 및 이용 동의 */}
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <input
            type="checkbox"
            id="personal"
            checked={terms.personal}
            onChange={() => handleToggleItem({ name: 'personal' })}
          />
          <label className="cursor-pointer" htmlFor="personal">
            개인정보수집 및 이용동의
          </label>
        </div>
        <p className="cursor-pointer" onClick={() => handleSelectTerms(2)}>
          자세히보기 &#62;
        </p>
      </div>

      {/* 회원가입 방법 */}
      <p className="mt-10 text-center text-xl font-bold">회원가입 방법 선택</p>

      <div className="flex justify-center gap-4">
        <div className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-sm">
          구글
        </div>
        <div className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-sm">
          카카오
        </div>
        <div
          className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-sm"
          onClick={handleMoveNext}
        >
          자사
        </div>
      </div>
    </div>
  );
};

export default Terms;
