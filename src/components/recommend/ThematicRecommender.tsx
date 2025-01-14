'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import { useAuthStore } from '@/store/authStore';
import { Database } from '@/types/supabase';

import ProductCard from '../common/ProductCard';

type Drink = Database['public']['Tables']['drinks']['Row'];

type ThematicRecommenderProps = {
  season: string;
  foodCategory: string;
  mood: string;
  seasonRecommendations: Drink[];
  foodRecommendations: Drink[];
  moodRecommendations: Drink[];
};

const ThematicRecommender: React.FC<ThematicRecommenderProps> = ({
  season,
  foodCategory,
  mood,
  seasonRecommendations,
  foodRecommendations,
  moodRecommendations,
}) => {
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

  return (
    <div className="space-y-6 p-4">
      {/* 환영 문구 섹션 */}
      <section className="rounded-lg bg-gray-200 p-4">
        <h1 className="text-xl font-bold">환영환영</h1>
        <div className="mt-2">
          <p className="text-lg font-semibold">
            AI로 맞춤 전통주 추천 받으러 가기
          </p>
          <p className="text-sm text-gray-600">
            입력된 취향을 기반으로 나만을 위한 전통주를 추천해드려요!
          </p>
        </div>
      </section>
      {/* 추천 섹션 */}
      {sections.map((section, index) => (
        <section key={index}>
          <h2 className="mb-4 text-lg font-bold">{section.title}</h2>
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
