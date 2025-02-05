import { useRouter } from 'next/navigation';

import { useModal } from '@/app/providers/ModalProvider';
import { SurveyType } from '@/types/preferences';

type StepButtonProps = {
  content: string;
  onClick: (data: Partial<SurveyType>) => void;
  disabled: boolean;
};

const StepButton = ({
  content,
  onClick,
  disabled = false,
}: StepButtonProps) => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const openSurveyExitModal = () => {
    openModal({
      title: '취향 설문을 종료하시겠어요?',
      content: '지금 종료하시면 설문은 저장되지 않습니다.',
      secondaryAction: {
        text: '계속하기',
        onClick: closeModal,
      },
      primaryAction: {
        text: '종료하기',
        onClick: () => {
          router.push('/');
          closeModal();
        },
      },
      showCloseButton: false,
    });
  };

  return (
    <div className="fixed bottom-[0px] flex w-full max-w-[450px] flex-col items-center px-[20px]">
      <button
        className={`w-full rounded-[8px] px-[16px] py-[12px] text-label-xlm ${
          disabled
            ? 'cursor-not-allowed bg-grayscale-200 text-grayscale-100'
            : 'bg-primary text-grayscale-100'
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        {content}
      </button>

      <button
        className="mb-[20px] mt-[24px] h-[48px] text-label-lm text-grayscale-500 underline"
        onClick={openSurveyExitModal}
      >
        그만할래요
      </button>
    </div>
  );
};

export default StepButton;
