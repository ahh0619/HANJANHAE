'use client';

import { useEffect, useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useMultipleLike } from '@/hooks/like/useMultipleLike';
import { useAuthStore } from '@/store/authStore';
import { DrinkType } from '@/types/drink';

import ProductCard from '../common/ProductCard';

type ThematicRecommenderProps = {
  recommendations: {
    season: string;
    foodCategory: string;
    mood: string;
    seasonRecommendations: DrinkType[];
    foodRecommendations: DrinkType[];
    moodRecommendations: DrinkType[];
  };
};

const ThematicRecommender = ({ recommendations }: ThematicRecommenderProps) => {
  const { user } = useAuthStore();
  const userId = user?.id || '';

  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const {
    season,
    foodCategory,
    mood,
    seasonRecommendations,
    foodRecommendations,
    moodRecommendations,
  } = recommendations;

  const allItems = [
    ...seasonRecommendations,
    ...foodRecommendations,
    ...moodRecommendations,
  ];
  const allDrinkIds = allItems.map((item) => item.id);

  const { isLoading, likeMap, toggleItem } = useMultipleLike(
    userId,
    allDrinkIds,
  );

  if (!isBrowser) {
    return null;
  }

  const sections = [
    { title: `${season}에 어울리는 전통주`, items: seasonRecommendations },
    { title: `${foodCategory}에 어울리는 전통주`, items: foodRecommendations },
    { title: `${mood}에 어울리는 전통주`, items: moodRecommendations },
  ];

  return (
    <div className="mt-9 space-y-6 px-5 xl:mt-[100px] xl:px-10">
      {sections.map((section, idx) => (
        <section key={idx}>
          <h2 className="mb-3 text-title-lb xl:mb-11 xl:mt-[100px] xl:text-title-xl">
            {section.title}
          </h2>
          {section.items.length > 0 ? (
            <Swiper
              spaceBetween={16}
              slidesPerView="auto"
              breakpoints={{
                1280: {
                  spaceBetween: 20,
                },
              }}
            >
              {section.items.map((item) => {
                const isLiked = likeMap[item.id] || false;
                return (
                  <SwiperSlide key={item.id} style={{ width: 'auto' }}>
                    <ProductCard
                      id={item.id}
                      name={item.name}
                      imageUrl={item.image}
                      isLiked={isLiked}
                      onToggleLike={() => toggleItem(item.id)}
                    />
                  </SwiperSlide>
                );
              })}
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
