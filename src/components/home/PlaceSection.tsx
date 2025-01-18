'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

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
    <section className="mt-9 space-y-6 px-5">
      <h2 className="mb-3 text-title-lb text-grayscale-900">
        전통주 다이닝바 추천
      </h2>
      {!places || places.length === 0 ? (
        <p>데이터가 존재하지 않습니다.</p>
      ) : (
        <Swiper spaceBetween={16} slidesPerView="auto">
          {places.map((place: PlaceType) => (
            <SwiperSlide key={place.id} style={{ width: 'auto' }}>
              <PlaceCard id={place.id} name={place.name} image={place.image} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default PlaceSection;
