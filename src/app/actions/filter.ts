'use server';
// app/actions/filterData.ts (서버 액션)

import { Database } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';


export type TastePreferences = {
  sweetness?: number;
  acidity?: number;
  carbonation?: number;
  body?: number;
};

export type FilterParams = {
  types: string[];
  alcoholStrength?: [number, number] | null;
  tastePreferences?: TastePreferences;
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
export type DrinkWithLikeStats = {
  id: number; // 음료 ID
  name: string; // 음료 이름
  image: string; // 음료 이미지 URL
  like_count: number; // 각 음료의 좋아요 개수
  total_likes: number; // 전체 좋아요 개수
};

type FetchDrinksWithLikeCountResponse = Database["public"]["Functions"]["fetch_drinks_with_like_count"]["Returns"];

type Drink = Database['public']['Tables']['drinks']['Row'];

// 삭제 예정 필터링 로직
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

const getRange = (page: number, pageSize: number): [number, number] => {
  return [(page - 1) * pageSize, page * pageSize - 1]; // ✅ limit 조정
};

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
  totalCount: number; // 전체 개수 추가
}> {
  const supabase = createClient();
  // 전체 말고 필요한 필드만 선택해서 가져오기
  // let query = supabase.from('drinks').select('*');
  let query = supabase
    .from('drinks')
    .select(
      'id, name, type, alcohol_content,image,sweetness, acidity, carbonation, body',
      { count: 'exact' },
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
  const [offset, limit] = getRange(page, pageSize);
  query = query.range(offset, offset + limit);

  const { data, count, error } = await query;

  // 에러 처리
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
    totalCount: count || 0, // 전체 카운트 반환
  };
}

// 기존의 안쓰는 로직 기록용으로 남겨둔 것 삭제 예정
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
  totalCount: number;
}> {
  const supabase = createClient();

  // 페이지네이션 적용
  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  const { data, count, error } = await supabase
    .from('drinks')
    .select('id, name,image', { count: 'exact' })
    .ilike('name', `%${keyword}%`) // name 컬럼에서 keyword를 포함하는 데이터 검색
    .range(offset, offset + limit - 1);

  // 에러처리
  if (error) {
    throw new Error('Error fetching data by keyword');
  }
  const hasNextPage = data.length === pageSize;
  const nextPage = hasNextPage ? page + 1 : null;
  return {
    drinks: (data as Drink[]) || [],
    nextPage,
    hasNextPage,
    totalCount: count || 0, // 전체 카운트 반환
  };
}

// 필터값 sort
export async function filterSortedDrinks({
  types,
  alcoholStrength,
  tastePreferences,
  page = 1,
  pageSize = 20,
  sortBy = 'name',
  sortOrder = 'asc',
}: FilterParams & {
  page?: number;
  pageSize?: number;
  sortBy?: keyof Drink;
  sortOrder?: 'asc' | 'desc';
}): Promise<{
  drinks: Drink[];
  nextPage: number | null;
  hasNextPage: boolean;
  totalCount: number;
}> {
  const supabase = createClient();
  // 전체 말고 필요한 필드만 선택해서 가져오기
  // let query = supabase.from('drinks').select('*');
  let query = supabase
    .from('drinks')
    .select(
      'id, name, type, alcohol_content,image,sweetness, acidity, carbonation, body',
      { count: 'exact' },
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
  // 정렬 추가
  query = query.order(sortBy, { ascending: sortOrder === `asc` });

  // 페이지네이션 적용

  const [offset, limit] = getRange(page, pageSize);
  query = query.range(offset, limit);

  const { data, count, error } = await query;
  console.log(data, count);

  // 에러 처리
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
    totalCount: count || 0,
  };
}

// 검색값 sort

export async function filterKeywordSortedDrinks({
  keyword,
  page = 1,
  pageSize = 20,
  sortBy = 'name',
  sortOrder = 'asc',
}: {
  keyword: string;
  page?: number;
  pageSize?: number;
  sortBy?: keyof Drink;
  sortOrder?: 'asc' | 'desc';
}): Promise<{
  drinks: Drink[];
  nextPage: number | null;
  hasNextPage: boolean;
  totalCount: number;
}> {
  const supabase = createClient();
  // 페이지네이션 적용
  const [offset, limit] = getRange(page, pageSize);

  const { data, count, error } = await supabase
    .from('drinks')
    .select('id,name,image,type', { count: 'exact' })
    .or(`name.ilike.%${keyword},type.ilike.%${keyword}%`) // name 또는 type에 keyword 포함
    .order(sortBy, { ascending: sortOrder === 'asc' })
    .range(offset, limit);

  if (error) {
    throw new Error('Error fetching data by keyword');
  }
  const hasNextPage = data.length === pageSize;
  const nextPage = hasNextPage ? page + 1 : null;
  return {
    drinks: (data as Drink[]) || [],
    nextPage,
    hasNextPage,
    totalCount: count || 0, // 전체 카운트 반환
  };
}

// 좋아요 sort

export const getPopularDrinks = async ({
  page = 1,
  pageSize = 10,
}: {
  page?: number;
  pageSize?: number;
}): Promise<{
  likedDrinks: any[];
  nextPage: number | null;
  hasNextPage: boolean;
  totalCount: number;
}> => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('fetch_drinks_with_like_count');
  if (data) {
    console.log(data); // data가 DrinkWithLikeStats[] 타입과 일치
  }
  // 수정된 RPC 함수 호출

  if (error) {
    console.error('Error fetching popular drinks:', error);
    return {
      likedDrinks: [],
      nextPage: null,
      hasNextPage: false,
      totalCount: 0,
    };
  }
  if (error) {
    throw new Error('Error fetching popular drinks');
  }

  const totalCount = data?.[0]?.total_likes || 0;

  // name, image, like_count를 기준으로 음료 데이터를 정렬
  const sortedDrinks = data
    ? data.sort((a: any, b: any) => b.like_count - a.like_count)
    : [];

  // 페이지네이션
  const [offset] = getRange(page, pageSize);
  const paginatedLiked = sortedDrinks.slice(offset, offset + pageSize);

  // 다음 페이지 존재 여부 확인
  const hasNextPage = offset + pageSize < sortedDrinks.length;
  const nextPage = hasNextPage ? page + 1 : null;

  return {
    likedDrinks: paginatedLiked,
    nextPage,
    hasNextPage,
    totalCount,
  };
};

export async function getDrinkCount({
  types,
  alcoholStrength,
  tastePreferences,
}: FilterParams): Promise<{
  totalCount: number; // 전체 개수 추가
}> {
  const supabase = createClient();
  // 전체 말고 필요한 필드만 선택해서 가져오기
  // let query = supabase.from('drinks').select('*');
  let query = supabase
    .from('drinks')
    .select('type, alcohol_content, sweetness, acidity, carbonation, body', {
      count: 'exact',
      head: true,
    });

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

  const { count, error } = await query;

  // 에러 처리
  if (error) {
    throw new Error('Error fetching filtered data');
  }

  return {
    totalCount: count || 0, // 전체 카운트 반환
  };
}


