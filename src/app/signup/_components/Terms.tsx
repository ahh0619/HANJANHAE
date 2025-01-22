'use client';
import { useState } from 'react';

import Button from '@/components/auth/Button';
import CheckField from '@/components/auth/CheckField';
import Modal from '@/components/auth/Modal';

type TermsProps = {
  handleMoveStep: (value: number) => void;
  handleSelectTerms: (value: number | null) => void;
};

const Terms = ({ handleMoveStep, handleSelectTerms }: TermsProps) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [terms, setTerms] = useState({ use: false, personal: false });

  /* 모두 체크 여부 토글 */
  const handleToggleAll = () => {
    const hasFalse = Object.values(terms).some((value) => value === false);

    setTerms({
      ...terms,
      ['use']: hasFalse,
      ['personal']: hasFalse,
    });
  };

  /* 체크 여부 토글 */
  const handleToggleTerm = ({ name }: { name: keyof typeof terms }) => {
    setTerms({ ...terms, [name]: !terms[name] });
  };

  /* 다음 단계로 이동 */
  const handleMoveNext = () => {
    if (!terms.use || !terms.personal) {
      setIsOpenModal(true);
    } else {
      handleMoveStep(2);
    }
  };

  return (
    <>
      <p className="mb-9 text-body-sm text-grayscale-500">
        한잔해를 이용하시려면 이용약관에 동의해주세요.
      </p>

      <p className="mb-5 text-title-lb text-grayscale-900">
        이용약관 동의 (필수)
      </p>

      <div className="flex flex-col gap-1">
        <CheckField
          id="all"
          label="모두 동의하기"
          checked={terms.use && terms.personal}
          handleChange={handleToggleAll}
        />

        <div className="relative my-2">
          <div className="absolute left-[-20px] right-[-20px] h-[1px] bg-grayscale-200"></div>
        </div>

        <div className="flex justify-between">
          <CheckField
            id="use"
            label="홈페이지 이용약관"
            checked={terms.use}
            handleChange={() => handleToggleTerm({ name: 'use' })}
          />
          <Button
            category="detail"
            label="자세히보기"
            handleClick={() => handleSelectTerms(1)}
          />
        </div>

        <div className="flex justify-between">
          <CheckField
            id="personal"
            label="개인정보수집 및 이용동의"
            checked={terms.personal}
            handleChange={() => handleToggleTerm({ name: 'personal' })}
          />
          <Button
            category="detail"
            label="자세히보기"
            handleClick={() => handleSelectTerms(2)}
          />
        </div>
      </div>

      <div className="absolute bottom-16 -mx-5 w-full px-5">
        <Button label="다음" handleClick={handleMoveNext} />
      </div>

      {isOpenModal && (
        <Modal
          title="약관 동의는 필수입니다."
          content="모든 항목에 동의해주세요."
          button={{ text: '확인', onClick: () => setIsOpenModal(false) }}
        />
      )}
    </>
  );
};

export default Terms;
