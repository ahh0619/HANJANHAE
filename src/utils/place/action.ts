'use server';

import { PlaceType } from '@/types/place';

import { createClient } from '../supabase/server';

export const fetchPlace = async (placeId: string): Promise<PlaceType> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('places')
    .select('*, menus(*)')
    .eq('id', placeId)
    .single();

  if (error) throw new Error(error.message);

  return data;
};
