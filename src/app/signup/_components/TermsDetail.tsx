import { useMediaQuery } from 'react-responsive';

import Button from '@/components/auth/Button';
import { PRIVACY_POLICY, SERVICE_POLICY } from '@/constants';

type TermsDetailProps = {
  terms: number | null;
  handleClose: (value: number | null) => void;
};

const TermsDetail = ({ terms, handleClose }: TermsDetailProps) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  return (
    <>
      {isDesktop ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-5">
          <div className="h-[456px] w-[560px] rounded-xl bg-etc-white p-6">
            <Button
              category="close"
              label=""
              handleClick={() => handleClose(null)}
            />
            <h1 className="mb-2 text-center text-title-xl text-grayscale-900">
              이용약관
            </h1>

            <div className="h-[344px] overflow-y-scroll px-4">
              <p className="whitespace-pre-line text-title-mm text-grayscale-900">
                {terms === 1
                  ? '홈페이지 이용약관\n'
                  : '개인정보수집 및 이용동의\n'}
              </p>

              <p className="whitespace-pre-line text-body-sm text-grayscale-900">
                {terms === 1 ? SERVICE_POLICY : PRIVACY_POLICY}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute left-0 right-0 top-0 bg-white">
          <div className="relative sticky top-0 z-30 mx-auto max-w-[600px] bg-white px-5">
            <Button
              category="back"
              label=""
              handleClick={() => handleClose(null)}
            />
            <h1 className="mb-10 py-[6px] text-center text-title-xl text-grayscale-900">
              이용약관
            </h1>
          </div>

          <div className="relative mx-auto max-w-[600px] px-5">
            <p className="whitespace-pre-line text-title-mm text-grayscale-900">
              {terms === 1
                ? '홈페이지 이용약관\n'
                : '개인정보수집 및 이용동의\n'}
            </p>

            <p className="whitespace-pre-line text-body-sm text-grayscale-900">
              {terms === 1 ? SERVICE_POLICY : PRIVACY_POLICY}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default TermsDetail;
