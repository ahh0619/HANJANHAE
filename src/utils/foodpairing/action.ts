'use server';

import { createClient } from '@/utils/supabase/client';

type FoodPairing = {
  id: string;
  food_name: string;
  food_image: string | null;
};

export const fetchFoodPairings = async (
  drinkId: string,
): Promise<FoodPairing[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('food_pairings')
    .select(
      `
      id,
      foods (
        name,
        image
      )
    `,
    )
    .eq('drink_id', drinkId);

  if (error) {
    console.error('Error fetching food pairings:', error.message);
    return [];
  }

  // 데이터 정리: `foods` 데이터를 펼쳐서 반환
  return data.map((pairing) => ({
    id: pairing.id,
    food_name: pairing.foods.name,
    food_image: pairing.foods.image,
  }));
};
