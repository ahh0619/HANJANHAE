'use client';

import { useRouter } from 'next/navigation';

import { fetchUser } from '@/app/actions/auth';
import { useModal } from '@/app/providers/ModalProvider';
import OptimizedImage from '@/components/common/OptimizedImage';

const BeforeBannerMobile = () => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const handleClick = async () => {
    const user = await fetchUser();
    if (user) {
      router.push('/survey');
    } else {
      openModal({
        title: '취향 설문을 진행하시겠어요?',
        content: `비회원 이용 시 \n 설문 결과는 기기에 임시 저장되며, \n 다른 기기에서는 다시 설문이 필요합니다.`,
        secondaryAction: {
          text: '로그인하기',
          onClick: () => {
            router.push('/signin');
            closeModal();
          },
        },
        primaryAction: {
          text: '회원가입하기',
          onClick: () => {
            router.push('/signup');
            closeModal();
          },
        },
        optionalAction: {
          text: '비회원으로 이용하기',
          onClick: () => {
            router.push('/survey');
            closeModal();
          },
        },
        showCloseButton: true,
      });
    }
  };

  return (
    <section
      onClick={handleClick}
      className="relative flex h-[184px] w-full flex-col items-start rounded-2xl bg-gradient-main-banner px-[20px] shadow-main-banner xl:hidden"
    >
      {/* 텍스트 영역 */}
      <p className="mb-[8px] mt-[28px] text-body-sm text-grayscale-100">
        취향 조사 후 나만을 위한 추천 리스트를 확인해보세요!
      </p>

      <div className="mb-[76px] text-title-lb text-grayscale-100">
        <p>AI가 맞춤 전통주를</p>
        <p>추천해드려요</p>
      </div>

      {/* 이미지 영역 */}
      <div className="absolute bottom-[12px] right-[20px]">
        <OptimizedImage
          src="/assets/Banner_before image.svg"
          alt="Banner Before"
          width={118}
          height={118}
        />
      </div>
    </section>
  );
};

export default BeforeBannerMobile;
