'use client';

import { useQuery } from '@tanstack/react-query';

import { Database } from '@/types/supabase';
import { fetchFoodPairings } from '@/utils/foodpairing/action'; // 적절한 경로로 설정하세요

import DrinkBasicInfo from './DrinkBasicInfo';
import DrinkDescription from './DrinkDescription';
import DrinkImage from './DrinkImage';
import DynamicHeader from './DynamicHeader';
import FoodPairing from './FoodPairing';
import FoodPairingSkeleton from './FoodPairingSkeleton';

type Drink = Database['public']['Tables']['drinks']['Row'];

type DrinkDetailProps = {
  drink: Drink;
};

const DrinkDetail = ({ drink }: DrinkDetailProps) => {
  const {
    data: foodPairings = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['foodPairings', drink.id],
    queryFn: () => fetchFoodPairings(drink.id),
    enabled: !!drink.id, // 쿼리 실행 조건 설정
  });

  return (
    <div className="relative">
      <DynamicHeader
        name={drink.name}
        onBackClick={() => console.log('뒤로가기')}
        onFavoriteClick={() => console.log('좋아요 클릭')}
        onShareClick={() => console.log('공유하기 클릭')}
      />

      <div className="mx-auto max-w-md">
        <DrinkImage image={drink.image} name={drink.name} />
        <DrinkDescription name={drink.name} description={drink.description} />
        <DrinkBasicInfo drink={drink} />

        {/* Food Pairings */}
        <section className="border-b p-4">
          {isLoading ? (
            <FoodPairingSkeleton />
          ) : isError ? (
            <p className="text-sm text-red-500">
              {error instanceof Error ? error.message : '오류 발생'}
            </p>
          ) : foodPairings.length > 0 ? (
            <FoodPairing pairings={foodPairings} />
          ) : (
            <p className="text-sm text-gray-500">추천 페어링 음식 정보 없음</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default DrinkDetail;
