'use server';
// app/actions/filterData.ts (서버 액션)
import { Database } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';

export type FilterParams = {
  types: string[];
  alcoholStrength?: [number, number] | null;
  tastePreferences?: Record<string, number>;
};

export type PopularDrinks = {
  id: string;
  name: string;
  image: string;
  like_count: number;
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
  const supabase = createClient();
  const { data, error } = await supabase
    .from('drinks')
    .select('*')
    .ilike('name', `%${keyword}%`); // name 컬럼에서 keyword를 포함하는 데이터 검색

  if (error) {
    throw new Error('Error fetching data by keyword');
  }

  return (data as Drink[]) || [];
}

export const getPopularDrinks = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .rpc('fetch_popular_drinks'); // 수정된 RPC 함수 호출

  if (error) {
    console.error('Error fetching popular drinks:', error);
    return [];
  }

  // name, image, like_count를 기준으로 음료 데이터를 정렬
  const sortedDrinks = data
    ? data.sort((a: any, b: any) => b.like_count - a.like_count)
    : [];

  return sortedDrinks; // name, image, like_count를 포함한 정렬된 데이터 반환
};

