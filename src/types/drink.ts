import { Database } from './supabase';

export type DrinkType = Database['public']['Tables']['drinks']['Row'];

export type PopularDrinkType = Pick<DrinkType, 'id' | 'name' | 'image'> & {
  like_count: number;
};
