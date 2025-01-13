'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useAuthStore } from '@/store/authStore';
import 'swiper/css';

import DiningBarCard from './DiningBarCard';
import ProductCard from './ProductCard';

const products = [
  {
    id: '00d2ae65-a34e-46da-a374-984d7999fadf',
    name: '지평 생 옛막걸리',
    imageUrl:
      'https://tafcserapqjqnjmqqouu.supabase.co/storage/v1/object/public/drink_images/033.jpg',
  },
  {
    id: '3777c435-9b88-440a-817a-907c811e1ebb',
    name: '조선주조사',
    imageUrl:
      'https://tafcserapqjqnjmqqouu.supabase.co/storage/v1/object/public/drink_images/017.jpg',
  },
  {
    id: '3c9af251-a2ca-4fe7-993c-587eb71c9d3b',
    name: '지장수 생막걸리',
    imageUrl:
      'https://tafcserapqjqnjmqqouu.supabase.co/storage/v1/object/public/drink_images/003.jpg',
  },
  {
    id: '1bb2383b-f570-4811-98ee-399724e395d3',
    name: '시나브로 드 글로리아',
    imageUrl:
      'https://tafcserapqjqnjmqqouu.supabase.co/storage/v1/object/public/drink_images/434.jpg',
  },
  {
    id: '37daa959-6a5e-4b5a-90c2-6c43c8f12169',
    name: '한산소곡주(살균주)',
    imageUrl:
      'https://tafcserapqjqnjmqqouu.supabase.co/storage/v1/object/public/drink_images/439.jpg',
  },
];

const diningBars = [
  {
    id: '0089bd01-8e78-4986-8f42-f705e91e3f93',
    name: '삼각지 주식',
    imageUrl:
      'https://d12zq4w4guyljn.cloudfront.net/300_300_20240806013427862_photo_794cc192ad22.jpg',
  },
  {
    id: '4435bb4f-be66-4a8c-af53-8c3ad0175b2a',
    name: '부엉이산장 연신내 본점',
    imageUrl:
      'https://d12zq4w4guyljn.cloudfront.net/300_300_20241002235902_photo1_hkRAhLEW5gil.jpg',
  },
  {
    id: '0ef09b2e-48b9-4d7f-a82c-326cee70957d',
    name: '리파인 잠실방이점',
    imageUrl:
      'https://d12zq4w4guyljn.cloudfront.net/300_300_20240813110453_photo1_d753a4b5aa01.jpg',
  },
  {
    id: 'ec9f4c4a-ae5a-486d-b9d2-d5f31ec2a686',
    name: '무교주가 제일제면소',
    imageUrl:
      'https://d12zq4w4guyljn.cloudfront.net/300_300_20241220062929994_photo_5e0bf9bca473.jpg',
  },
  {
    id: '6408ef67-a6cf-4d84-8464-cd0eefd29717',
    name: '한식주점 분코 사당점',
    imageUrl:
      'https://d12zq4w4guyljn.cloudfront.net/300_300_20241203104521_photo1_b1d1d5986fb3.jpg',
  },
];

const MockSection: React.FC = () => {
  const { user } = useAuthStore();

  const sections = [
    { title: '겨울에 어울리는 전통주', items: products },
    { title: '단맛이 나는 전통주', items: products },
    { title: '파전과 어울리는 전통주', items: products },
    { title: '인기 전통주', items: products },
    { title: '전통주 다이닝바 추천', items: diningBars },
  ];

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
      {/* 캐러셀 섹션 */}
      {sections.map((section, index) => (
        <section key={index}>
          <h2 className="mb-4 text-lg font-bold">{section.title}</h2>
          <Swiper spaceBetween={16} slidesPerView="auto">
            {section.items.map((item: any) => (
              <SwiperSlide key={item.id} style={{ width: 'auto' }}>
                {item.imageUrl.includes('drink_images') ? (
                  <ProductCard
                    id={item.id}
                    name={item.name}
                    imageUrl={item.imageUrl}
                    userId={user?.id}
                  />
                ) : (
                  <DiningBarCard name={item.name} imageUrl={item.imageUrl} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      ))}
    </div>
  );
};

export default MockSection;
