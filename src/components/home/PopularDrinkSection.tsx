'use client';

import 'swiper/css';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useAuthStore } from '@/store/authStore';
import { PopularDrinkType } from '@/types/drink';

import ProductCard from '../common/ProductCard';

type PopularDrinkSectionProps = {
  drinks: PopularDrinkType[];
};

const PopularDrinkSection = ({ drinks }: PopularDrinkSectionProps) => {
  const { user } = useAuthStore();

  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) return null;

  return (
    <section className="mt-9 space-y-6 px-5">
      <h2 className="mb-3 text-title-lb text-grayscale-900">인기 전통주</h2>
      {!drinks || drinks.length === 0 ? (
        <p>데이터가 존재하지 않습니다.</p>
      ) : (
        <Swiper spaceBetween={16} slidesPerView="auto">
          {drinks.map((drink) => (
            <SwiperSlide key={drink.id} style={{ width: 'auto' }}>
              <ProductCard
                id={drink.id}
                name={drink.name}
                imageUrl={drink.image}
                userId={user ? user.id : null}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default PopularDrinkSection;
