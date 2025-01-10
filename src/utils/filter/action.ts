// app/actions/filterData.ts (서버 액션)
import { Database } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';

export type FilterParams = {
  types: string[];
  alcoholStrength?: number | null;
  tastePreferences?: Record<string, number>;
};

type Drink = Database['public']['Tables']['drinks']['Row'];

export async function filterDrinks({
  types,
  alcoholStrength,
  tastePreferences,
}: FilterParams): Promise<Drink[]> {
  const supabase = createClient();
  let query = supabase.from('drinks').select('*');

  // 술 타입 필터링
  if (types.length > 0) {
    query = query.in('type', types);
  }

  // 도수 필터링
  if (alcoholStrength) {
    query = query.eq('alcohol_content', alcoholStrength);
  }

  // 맛 카테고리 필터링
  if (tastePreferences) {
    Object.entries(tastePreferences).forEach(([category, value]) => {
      query = query.eq(category, value);
    });
  }

  const { data, error } = await query;

  if (error) {
    throw new Error('Error fetching filtered data');
  }

  return data as Drink[];
}
