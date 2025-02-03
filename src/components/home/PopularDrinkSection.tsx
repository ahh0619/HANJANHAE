'use client';

import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useProgressbar } from '@/hooks/common/useProgressbar';
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
  const swiperRef = useRef(null);
  const { onMouseDown, onMouseMove, onMouseUp, isDragging } =
    useProgressbar(swiperRef);

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
    <section className="mt-9 px-5 xl:mt-[100px] xl:px-10">
      <h2 className="mb-3 text-title-lb text-grayscale-900 xl:mb-11 xl:mt-[100px] xl:text-title-xl">
        인기 전통주
      </h2>
      {!drinks || drinks.length === 0 ? (
        <p>데이터가 존재하지 않습니다.</p>
      ) : (
        <>
          <Swiper
            modules={[Pagination]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={12}
            slidesPerView="auto"
            breakpoints={{
              1280: {
                spaceBetween: 20,
              },
            }}
            pagination={{ el: '.swiper-pagination-drink', type: 'progressbar' }}
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
          <div
            className="swiper-pagination-drink mt-4 hidden rounded xl:block"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
          />
        </>
      )}
    </section>
  );
};

export default PopularDrinkSection;
