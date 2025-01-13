'use server';
// app/actions/filterData.ts (서버 액션)
import { Database } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';

export type FilterParams = {
  types: string[];
  alcoholStrength?: [number, number] | null;
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
    const [min, max] = alcoholStrength;

    // alcohol_content는 numeric 필드이므로 범위로 필터링
    query = query.gte('alcohol_content', min).lte('alcohol_content', max);
  } else {
    // alcoholStrength가 없으면 기본값인 0 ~ 100 범위로 필터링
    query = query.gte('alcohol_content', 0).lte('alcohol_content', 100);
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

export async function filterDrinksByKeyword(keyword: string): Promise<Drink[]> {
  if (!keyword) return;
  const supabase = createClient();
  const { data, error } = await supabase
    .from('drinks')
    .select('*')
    .ilike('name', `%${keyword}%`); // name 컬럼에서 keyword를 포함하는 데이터 검색

  if (error) {
    throw new Error('Error fetching data by keyword');
  }

  return data as Drink[];
}
