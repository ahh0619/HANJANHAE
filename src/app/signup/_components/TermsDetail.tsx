import Button from '@/components/auth/Button';
import { TermsData } from '@/datas/Terms';

type TermsDetailProps = {
  terms: number | null;
  handleClose: (value: number | null) => void;
};

const TermsDetail = ({ terms, handleClose }: TermsDetailProps) => {
  return (
    <div className="absolute left-0 right-0 top-0 bg-white">
      <div className="relative sticky top-0 z-10 mx-auto max-w-md bg-white px-5">
        <Button
          category="back"
          label=""
          handleClick={() => handleClose(null)}
        />
        <h1 className="mb-10 py-[6px] text-center text-title-xl text-grayscale-900">
          이용약관
        </h1>
      </div>

      <div className="relative mx-auto max-w-md px-5">
        <p className="whitespace-pre-line text-title-mm text-grayscale-900">
          {terms === 1 ? '홈페이지 이용약관\n' : '개인정보수집 및 이용동의\n'}
        </p>

        <p className="whitespace-pre-line text-body-sm text-grayscale-900">
          {terms === 1 ? TermsData['use'] : TermsData['personal']}
        </p>
      </div>
    </div>
  );
};

export default TermsDetail;
