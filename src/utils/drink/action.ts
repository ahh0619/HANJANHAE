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
    .single();

  if (error) {
    console.error('Error fetching drink by ID:', error.message);
    return null;
  }

  return data;
};
