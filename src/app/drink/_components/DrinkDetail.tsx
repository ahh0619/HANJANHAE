'use client';

import { useEffect, useState } from 'react';

import { Database } from '@/types/supabase';
import { fetchFoodPairings } from '@/utils/foodpairing/action'; // 적절한 경로로 설정하세요

import FoodPairing from './FoodPairing';

type Drink = Database['public']['Tables']['drinks']['Row'];

type FoodPairing = {
  id: string;
  food_name: string;
  food_image: string | null;
};

type DrinkDetailProps = {
  drink: Drink;
};

const DrinkDetail = ({ drink }: DrinkDetailProps) => {
  const [foodPairings, setFoodPairings] = useState<FoodPairing[] | null>(null); // 타입 정의
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!drink.id) return;

    const loadFoodPairings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchFoodPairings(drink.id); // 반환 타입: FoodPairing[]
        setFoodPairings(response || []); // response가 없을 경우 빈 배열 설정
      } catch (err) {
        console.error('Error fetching food pairings:', err);
        setError('음식 페어링 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadFoodPairings();
  }, [drink.id]);

  return (
    <div className="mx-auto max-w-md">
      {/* Main Image */}
      <div className="relative">
        <button className="absolute left-2 top-2 text-lg">{'<'}</button>
        <div className="flex h-64 w-full items-center justify-center rounded-lg">
          {drink.image ? (
            <img
              src={drink.image}
              alt={drink.name}
              className="h-auto max-h-full w-auto max-w-full rounded-lg object-contain"
            />
          ) : (
            <p className="text-lg font-semibold">대표이미지</p>
          )}
        </div>
      </div>

      {/* 술 이름과 Description */}
      <section className="border-b p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{drink.name}</h2>
          <div className="flex space-x-4">
            <button>❤️</button>
            <button>🔗</button>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          {drink.description || '설명 없음'}
        </p>
      </section>

      {/* Basic Info */}
      <section className="border-b p-4">
        <h3 className="text-lg font-bold">기본 정보</h3>
        <div className="mt-1">
          <p className="mt-1 text-sm text-gray-500">
            {drink.ingredients || '재료 정보 없음'}
          </p>
          <div className="mt-2 space-y-2 text-sm">
            <div className="flex justify-between">
              <p className="font-semibold">주종</p>
              <p className="text-gray-700">{drink.type || '정보 없음'}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">도수</p>
              <p className="text-gray-700">
                {drink.alcohol_content || '정보 없음'}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">용량</p>
              <p className="text-gray-700">{drink.volume || '정보 없음'}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">제조사</p>
              <p className="text-gray-700">
                {drink.manufacturer || '정보 없음'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Food Pairings */}
      <section className="border-b p-4">
        {loading ? (
          <p className="text-sm text-gray-500">로딩 중...</p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : foodPairings && foodPairings.length > 0 ? (
          <FoodPairing pairings={foodPairings} />
        ) : (
          <p className="text-sm text-gray-500">추천 페어링 음식 정보 없음</p>
        )}
      </section>
    </div>
  );
};

export default DrinkDetail;
