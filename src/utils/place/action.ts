'use server';

import { createServerClient } from '@supabase/ssr';

import { PlaceType, PlaceWithMenusType } from '@/types/place';

import { createClient } from '../supabase/server';

/* 다이닝바 목록 가져오기 */
export const fetchPlaces = async (): Promise<PlaceType[]> => {
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

  const { data, error } = await supabase.from('places').select('*');

  return error || !data ? [] : data;
};

/* 다이닝바 상세 정보 가져오기 */
export const fetchPlace = async (
  placeId: string,
): Promise<PlaceWithMenusType> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('places')
    .select('*, menus(*)')
    .eq('id', placeId)
    .single();

  if (error) throw new Error(error.message);

  return data;
};
