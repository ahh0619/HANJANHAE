import { Database } from './supabase';

export type DrinkType = Database['public']['Tables']['drinks']['Row'];

export type PopularDrinkType = Pick<DrinkType, 'id' | 'name' | 'image'> & {
  like_count: number;
};

export type DrinkDescriptionProps = {
  name: string;
  imageUrl: string;
  description: string | null;
  drinkId: string;
};

export type DrinkDetailProps = {
  drink: DrinkType;
  foodPairings: { food_name: string; food_image: string | null }[];
};

export type DrinkTaste = {
  sweetness: number | null;
  acidity: number | null;
  carbonation: number | null;
  body: number | null;
};

export type DrinkTasteProfileProps = {
  drink: DrinkTaste;
};

export type TasteProfileColor =
  | 'bg-secondary-200'
  | 'bg-secondary-300'
  | 'bg-primary-100'
  | 'bg-primary-200'
  | 'bg-primary-300';
