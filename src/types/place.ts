import { Database } from './supabase';

export type PlaceType = Database['public']['Tables']['places']['Row'] & {
  menus: MenuType[];
};

export type MenuType = Database['public']['Tables']['menus']['Row'];
