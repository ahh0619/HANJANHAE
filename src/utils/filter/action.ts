'use server';
// app/actions/filterData.ts (서버 액션)

import { Database } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';

export type FilterParams = {
  types: string[];
  alcoholStrength?: [number, number] | null;
  tastePreferences?: Record<string, number>;
};

export type FilterInifnite = {
  types: string[];
  alcoholStrength?: [number, number] | null;
  tastePreferences?: Record<string, number>;
  size: number;
  pageParam: number | null;
};

export type PopularDrinks = {
  id: string;
  name: string;
  image: string;
  like_count: number;
};

type Drink = Database['public']['Tables']['drinks']['Row'];

// export async function filterDrinks({
//   types,
//   alcoholStrength,
//   tastePreferences,
// }: FilterParams): Promise<Drink[]> {
//   const supabase = createClient();
//   // 전체 말고 필요한 필드만 선택해서 가져오기
//   // let query = supabase.from('drinks').select('*');
//   let query = supabase
//     .from('drinks')
//     .select(
//       'id, name, type, alcohol_content,image,sweetness, acidity, carbonation, body',
//     );

//   // 술 타입 필터링
//   if (types.length > 0) {
//     query = query.in('type', types);
//   }

//   // 도수 필터링
//   if (alcoholStrength) {
//     const [min, max] = alcoholStrength;

//     // alcohol_content는 numeric 필드이므로 범위로 필터링
//     query = query.gte('alcohol_content', min).lte('alcohol_content', max);
//   } else {
//     // alcoholStrength가 없으면 기본값인 0 ~ 100 범위로 필터링
//     query = query.gte('alcohol_content', 0).lte('alcohol_content', 100);
//   }

//   // 맛 카테고리 필터링
//   if (tastePreferences) {
//     Object.entries(tastePreferences).forEach(([category, value]) => {
//       query = query.eq(category, value);
//     });
//   }

//   const { data, error } = await query;

//   if (error) {
//     throw new Error('Error fetching filtered data');
//   }

//   return data as Drink[];
// }

export async function filterDrinks({
  types,
  alcoholStrength,
  tastePreferences,
  page = 1,
  pageSize = 10,
}: FilterParams & { page?: number; pageSize?: number }): Promise<{
  drinks: Drink[];
  nextPage: number | null;
  hasNextPage: boolean;
}> {
  const supabase = createClient();
  // 전체 말고 필요한 필드만 선택해서 가져오기
  // let query = supabase.from('drinks').select('*');
  let query = supabase
    .from('drinks')
    .select(
      'id, name, type, alcohol_content,image,sweetness, acidity, carbonation, body',
    );

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
  // 페이지네이션 적용

  const offset = (page - 1) * pageSize;
  const limit = pageSize - 1;
  query = query.range(offset, offset + limit);

  const { data, error } = await query;

  if (error) {
    throw new Error('Error fetching filtered data');
  }

  // 다음 페이지 존재유무 확인
  const hasNextPage = data.length === pageSize;
  const nextPage = hasNextPage ? page + 1 : null;

  return {
    drinks: data as Drink[],
    nextPage,
    hasNextPage,
  };
}

// export async function filterDrinksByKeyword(keyword: string): Promise<Drink[]> {
//   const supabase = createClient();
//   const { data, error } = await supabase
//     .from('drinks')
//     .select('id, name,image')
//     .ilike('name', `%${keyword}%`); // name 컬럼에서 keyword를 포함하는 데이터 검색
//   if (error) {
//     throw new Error('Error fetching data by keyword');
//   }

//   return (data as Drink[]) || [];
// }

export async function filterDrinksByKeyword({
  keyword,
  page = 1,
  pageSize = 20,
}: {
  keyword: string;
  page?: number;
  pageSize?: number;
}): Promise<{
  drinks: Drink[];
  nextPage: number | null;
  hasNextPage: boolean;
}> {
  const supabase = createClient();
  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  const { data, error } = await supabase
    .from('drinks')
    .select('id, name,image')
    .ilike('name', `%${keyword}%`) // name 컬럼에서 keyword를 포함하는 데이터 검색
    .range(offset, offset + limit - 1);
  if (error) {
    throw new Error('Error fetching data by keyword');
  }
  const hasNextPage = data.length === pageSize;
  const nextPage = hasNextPage ? page + 1 : null;
  return {
    drinks: (data as Drink[]) || [],
    nextPage,
    hasNextPage,
  };
}

export const getPopularDrinks = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('fetch_popular_drinks'); // 수정된 RPC 함수 호출

  if (error) {
    console.error('Error fetching popular drinks:', error);
    return [];
  }

  // name, image, like_count를 기준으로 음료 데이터를 정렬
  const sortedDrinks = data
    ? data.sort((a: any, b: any) => b.like_count - a.like_count)
    : [];

  return sortedDrinks;
};

export const filterDrinksWithSorting = async ({
  types,
  alcoholStrength,
  tastePreferences,
}: FilterParams): Promise<Drink[]> => {
  const supabase = createClient();
  let query = supabase.from('drinks').select('*');
  // 여기 부분에서 이미 sort를 진행해야 했다.
  // 이거 자체로 가져오는 데이터가 너무 크다 select('*') 부분이 잘못됨
  // 내가 조건에 맞는 데이터를 가져올 수 있게 select 내부를 수정해야 한다
  // 가져올 때도 sort를 해서 가져오게끔 이동해야 한다.

  // supabase에서 모든 데이터를 가져오게끔 로직이 애초에 구현되면 안된다.
  // 아래의 필터링이 supabase에서 필터를 하고 보낼 수 있기 때문에
  // 지금은 전체를 가져와서 필터링을 하는 방식이다.
  // 가지고 올 때 부터 filter나 sort된 데이터를 가져와야 한다.

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
};

export const SearchDrinksWithSorting = async (
  keyword: string,
): Promise<Drink[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('drinks')
    .select('*')
    .ilike('name', `%${keyword}%`); // name 컬럼에서 keyword를 포함하는 데이터 검색
  if (error) {
    throw new Error('Error fetching data by keyword');
  }

  return (data as Drink[]) || [];
};

