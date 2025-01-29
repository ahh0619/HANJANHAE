import EmailForm from '@/app/password/_components/EmailForm';

import Button from './Button';

type ResetPasswordModalProps = {
  handleClose: () => void;
};

const ResetPasswordModal = ({ handleClose }: ResetPasswordModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-5">
      <div className="w-[400px] rounded-xl bg-etc-white p-2">
        <Button category="close" label="" handleClick={() => handleClose()} />
        <h1 className="mb-4 mt-2 text-center text-title-lb text-grayscale-900">
          비밀번호 재설정
        </h1>
        <div className="px-5 pb-5">
          <EmailForm isModal={true} handleClose={handleClose} />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
