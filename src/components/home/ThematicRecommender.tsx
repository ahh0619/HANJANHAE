'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import { useAuthStore } from '@/store/authStore';
import { DrinkType } from '@/types/drink';

import ProductCard from '../common/ProductCard';

type Recommendations = {
  season: string;
  foodCategory: string;
  mood: string;
  seasonRecommendations: DrinkType[];
  foodRecommendations: DrinkType[];
  moodRecommendations: DrinkType[];
};

type ThematicRecommenderProps = {
  recommendations: Recommendations;
};

const ThematicRecommender: React.FC<ThematicRecommenderProps> = ({
  recommendations,
}) => {
  const {
    season,
    foodCategory,
    mood,
    seasonRecommendations,
    foodRecommendations,
    moodRecommendations,
  } = recommendations;

  const sections = [
    {
      title: `${season}에 어울리는 전통주`,
      items: seasonRecommendations,
    },
    {
      title: `${foodCategory}에 어울리는 전통주`,
      items: foodRecommendations,
    },
    {
      title: `${mood}에 어울리는 전통주`,
      items: moodRecommendations,
    },
  ];

  const { user } = useAuthStore();

  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) return null;

  return (
    <div className="mt-9 space-y-6 px-5">
      {/* 추천 섹션 */}
      {sections.map((section, index) => (
        <section key={index}>
          <h2 className="mb-3 text-title-lb">{section.title}</h2>
          {section.items.length > 0 ? (
            <Swiper spaceBetween={16} slidesPerView="auto">
              {section.items.map((item: any) => (
                <SwiperSlide key={item.id} style={{ width: 'auto' }}>
                  <ProductCard
                    id={item.id}
                    name={item.name}
                    imageUrl={item.image}
                    userId={user ? user.id : null}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-center text-gray-500">추천 결과가 없습니다.</p>
          )}
        </section>
      ))}
    </div>
  );
};

export default ThematicRecommender;
