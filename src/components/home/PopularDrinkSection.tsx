'use client';

import 'swiper/css';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useMultipleDrinkLike } from '@/hooks/like/useMultipleDrinkLike';
import { useAuthStore } from '@/store/authStore';
import { PopularDrinkType } from '@/types/drink';

import ProductCard from '../common/ProductCard';

type PopularDrinkSectionProps = {
  drinks: PopularDrinkType[];
};

const PopularDrinkSection = ({ drinks }: PopularDrinkSectionProps) => {
  const { user } = useAuthStore();
  const userId = user?.id || '';

  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const allDrinkIds = drinks.map((d) => d.id);

  const { isLoading, likeMap, handleToggleLike } = useMultipleDrinkLike({
    userId,
    drinkIds: allDrinkIds,
  });

  if (!isBrowser) return null;

  return (
    <section className="mt-9 space-y-6 px-5 xl:mt-[100px] xl:px-10">
      <h2 className="mb-3 text-title-lb text-grayscale-900 xl:mb-11 xl:mt-[100px] xl:text-title-xl">
        인기 전통주
      </h2>
      {!drinks || drinks.length === 0 ? (
        <p>데이터가 존재하지 않습니다.</p>
      ) : (
        <Swiper
          spaceBetween={16}
          slidesPerView="auto"
          breakpoints={{
            1280: {
              spaceBetween: 20,
            },
          }}
        >
          {drinks.map((drink) => {
            const isLiked = likeMap[drink.id] || false;
            return (
              <SwiperSlide key={drink.id} style={{ width: 'auto' }}>
                <ProductCard
                  id={drink.id}
                  name={drink.name}
                  imageUrl={drink.image}
                  isLiked={isLiked}
                  onToggleLike={() => handleToggleLike(drink.id)}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </section>
  );
};

export default PopularDrinkSection;
