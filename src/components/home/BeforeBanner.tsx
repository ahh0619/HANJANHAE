import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { fetchUser } from '@/utils/auth/action';

import Modal from '../common/Modal';

const BeforeBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    const user = await fetchUser();
    if (user) {
      router.push('/survey');
    } else {
      openModal();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section
        className="relative mx-[20px] flex h-[184px] w-[335px] flex-col items-start rounded-lg px-[20px]"
        style={{
          borderRadius: '16px',
          background:
            'linear-gradient(124deg, #BF324B 29.95%, #F495A6 119.58%)',
          boxShadow: '0px 5px 15px 0px rgba(249, 159, 175, 0.40)',
        }}
        onClick={handleClick}
      >
        {/* 텍스트 영역 */}
        <p className="mb-[8px] mt-[28px] text-xs font-bold leading-[18px] text-white">
          취향 조사 후 나만을 위한 추천 리스트를 확인해보세요!
        </p>

        <div className="mb-[76px] text-[20px] font-bold">
          <p className="leading-[1.35] text-white">AI가 맞춤 전통주를</p>
          <p className="leading-[1.35]] text-white">추천해드려요</p>
        </div>

        {/* 이미지 영역 */}
        <img
          src="/assets/Banner_before image.svg"
          alt="Banner Before"
          className="absolute bottom-[12px] right-[20px] h-[118px] w-[118px]"
        />
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="취향 설문을 진행하시겠어요?"
        content={`비회원 이용 시 \n 설문 결과는 기기에 임시 저장되며, \n 다른 기기에서는 다시 설문이 필요합니다.`}
        secondaryAction={{
          text: '로그인하기 ',
          onClick: () => {
            router.push('/signin');
            closeModal();
          },
        }}
        primaryAction={{
          text: '회원가입하기',
          onClick: () => {
            router.push('/signup');
            closeModal();
          },
        }}
        optionalAction={{
          text: '비회원으로 이용하기',
          onClick: () => {
            router.push('/survey');
            closeModal();
          },
        }}
        showCloseButton={true}
      />
    </>
  );
};

export default BeforeBanner;
