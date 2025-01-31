'use client';

import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { PlaceType } from '@/types/place';

import PlaceCard from '../common/PlaceCard';

type PlaceSectionProps = {
  places: PlaceType[];
};

const PlaceSection = ({ places }: PlaceSectionProps) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) return null;

  return (
    <section className="mt-9 space-y-6 px-5 xl:mt-[100px] xl:px-10">
      <h2 className="mb-3 text-title-lb text-grayscale-900 xl:mb-11 xl:text-title-xl">
        전통주 다이닝바 추천
      </h2>

      {!places || places.length === 0 ? (
        <p>데이터가 존재하지 않습니다.</p>
      ) : (
        <>
          {/* 스와이퍼 */}
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView="auto"
            breakpoints={{
              1280: {
                spaceBetween: 20,
              },
            }}
            pagination={{ el: '.swiper-pagination', type: 'progressbar' }}
          >
            {places.map((place) => (
              <SwiperSlide key={place.id} style={{ width: 'auto' }}>
                <PlaceCard
                  id={place.id}
                  name={place.name}
                  image={place.image}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination mt-2 hidden rounded xl:block" />
        </>
      )}
    </section>
  );
};

export default PlaceSection;
