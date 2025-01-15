'use server';

import { createServerClient } from '@supabase/ssr';

import { DrinkType, PopularDrinkType } from '@/types/drink';
import { createClient } from '@/utils/supabase/client';

export const fetchDrinks = async (id: string): Promise<DrinkType | null> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('drinks')
    .select('*')
    .eq('name', id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching drink by ID:', error.message);
    return null;
  }

  return data;
};

export const fetchDrinksByNames = async (
  names: string[],
): Promise<DrinkType[]> => {
  const supabase = createClient();

  if (!names || names.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from('drinks')
    .select('*')
    .in('name', names);

  if (error) {
    console.error('Error fetching drinks by names:', error.message);
    return [];
  }

  return data || [];
};

/* 인기 전통주 목록 가져오기 */
export const fetchPopularDrinks = async (): Promise<PopularDrinkType[]> => {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => [],
        setAll: () => {},
      },
    },
  );

  const { data, error } = await supabase.rpc('fetch_popular_drinks');

  return error || !data ? [] : data;
};
