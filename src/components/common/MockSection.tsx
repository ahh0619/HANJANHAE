'use client';

import React from 'react';

import { useAuthStore } from '@/store/authStore';

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
];

const Home: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6 p-4">
      <section>
        <h2 className="mb-4 text-lg font-bold">겨울에 어울리는 전통주</h2>
        <div className="flex gap-4 overflow-x-auto">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              userId={user?.id}
            />
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-lg font-bold">전통주 다이닝바 추천</h2>
        <div className="flex gap-4 overflow-x-auto">
          {diningBars.map((bar) => (
            <DiningBarCard
              key={bar.id}
              name={bar.name}
              imageUrl={bar.imageUrl}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
