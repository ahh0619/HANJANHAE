'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { fetchUser } from '@/app/actions/auth';
import { useModal } from '@/app/providers/ModalProvider';
import OptimizedImage from '@/components/common/OptimizedImage';

const BeforeBannerDesktop = () => {
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
    <Link
      href="#"
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      className="relative hidden h-[343px] w-[1280px] items-start rounded-br-[80px] rounded-tl-[80px] bg-gradient-main-banner shadow-main-banner xl:flex"
    >
      {/* 왼쪽 텍스트 영역 */}
      <div className="flex flex-col py-[64px] pl-[100px] text-grayscale-100">
        <p className="text-title-lm">
          취향 조사 후 나만을 위한 추천 리스트를 확인해보세요!
        </p>
        <p className="mt-8 text-title-2xl">AI가 맞춤 전통주를 추천해드려요</p>

        <button className="mt-10 flex h-[62px] w-fit items-center rounded-full bg-white p-4 text-label-xlm text-primary">
          <span className="mr-1">취향 조사 하러가기</span>
          <OptimizedImage
            src="/assets/icons/desktop_chevron-right.svg"
            alt="arrow icon"
            width={24}
            height={24}
          />
        </button>
      </div>

      {/* 오른쪽 아이콘(이미지) */}
      <div className="absolute bottom-[59px] right-[100px] top-[58px]">
        <OptimizedImage
          src="/assets/Desktop_banner_image_before.svg"
          alt="Before Banner Desktop"
          width={269}
          height={226}
        />
      </div>
    </Link>
  );
};

export default BeforeBannerDesktop;
