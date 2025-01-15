import { Database } from './supabase';

export type PlaceType = Database['public']['Tables']['places']['Row'];

export type MenuType = Database['public']['Tables']['menus']['Row'];

export type PlaceWithMenusType = PlaceType & { menus: MenuType[] };
