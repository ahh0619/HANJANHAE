'use server';

import { Database } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';

type Drink = Database['public']['Tables']['drinks']['Row'];

export const fetchDrinks = async (id: string): Promise<Drink | null> => {
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

export const fetchDrinksByNames = async (names: string[]): Promise<Drink[]> => {
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
