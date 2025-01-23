'use client';

import 'swiper/css';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useMultipleLike } from '@/hooks/like/useMultipleLike';
import { useAuthStore } from '@/store/authStore';
import { PopularDrinkType } from '@/types/drink';

import Modal from '../common/Modal';
import ProductCard from '../common/ProductCard';
import Toast from '../common/Toast';

type PopularDrinkSectionProps = {
  drinks: PopularDrinkType[];
};

const PopularDrinkSection = ({ drinks }: PopularDrinkSectionProps) => {
  const { user } = useAuthStore();
  const router = useRouter();
  const userId = user?.id || '';

  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const allDrinkIds = drinks.map((d) => d.id);

  const {
    isLoading,
    likeMap,
    toggleItem,
    isModalOpen,
    closeModal,
    toastMessage,
    closeToast,
  } = useMultipleLike(userId, allDrinkIds);

  if (!isBrowser) return null;

  return (
    <section className="mt-9 space-y-6 px-5">
      <h2 className="mb-3 text-title-lb text-grayscale-900">인기 전통주</h2>
      {!drinks || drinks.length === 0 ? (
        <p>데이터가 존재하지 않습니다.</p>
      ) : (
        <Swiper spaceBetween={16} slidesPerView="auto">
          {drinks.map((drink) => {
            const isLiked = likeMap[drink.id] || false;
            return (
              <SwiperSlide key={drink.id} style={{ width: 'auto' }}>
                <ProductCard
                  id={drink.id}
                  name={drink.name}
                  imageUrl={drink.image}
                  isLiked={isLiked}
                  onToggleLike={() => toggleItem(drink.id)}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="좋아요를 하시겠어요?"
        content={`좋아요 기능을 사용하려면 \n 로그인을 해야 해요.`}
        secondaryAction={{ text: '돌아가기', onClick: closeModal }}
        primaryAction={{
          text: '로그인하기',
          onClick: () => {
            router.push('/signin');
            closeModal();
          },
        }}
      />

      {toastMessage && <Toast message={toastMessage} onClose={closeToast} />}
    </section>
  );
};

export default PopularDrinkSection;
