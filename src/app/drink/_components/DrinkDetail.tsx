'use client';

import { useQuery } from '@tanstack/react-query';

import { useAuthStore } from '@/store/authStore';
import { Database } from '@/types/supabase';
import { fetchFoodPairings } from '@/utils/foodpairing/action';

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
  const { user } = useAuthStore();

  const {
    data: foodPairings = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['foodPairings', drink.id],
    queryFn: () => fetchFoodPairings(drink.id),
    enabled: !!drink.id,
  });

  return (
    <div className="relative">
      <DynamicHeader
        name={drink.name}
        image={drink.image!}
        description={drink.description!}
        userId={user?.id}
        drinkId={drink.id}
      />

      <div className="mx-auto max-w-md">
        <DrinkImage image={drink.image} name={drink.name} />
        <DrinkDescription
          name={drink.name}
          imageUrl={drink.image!}
          description={drink.description}
          userId={user?.id}
          drinkId={drink.id}
        />
        <DrinkBasicInfo drink={drink} />

        {/* Food Pairings */}
        <section className="border-b p-4">
          {isPending ? (
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
