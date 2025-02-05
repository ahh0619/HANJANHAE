'use server';

import {
  Drink,
  DrinkColums,
  FilterParams,
  KeywordParams,
  LikedDrinksWithCount,
} from '@/types/search';
import { createClient } from '@/utils/supabase/client';

// 객체 리터럴 문제로 반환되지 않음
// export type PaginatedResponse<T> = {
//   items: T[];
//   nextPage: number | null;
//   hasNextPage: boolean;
//   totalCount: number;
// };
// export type PaginatedPromise<T> = Promise<PaginatedResponse<T>>;

// export type DrinkResponse = PaginatedPromise<Drink>;

const allColumns: DrinkColums[] = [
  'id',
  'name',
  'type',
  'alcohol_content',
  'image',
  'sweetness',
  'acidity',
  'carbonation',
  'body',
];
// id,name,image,type

// 동적화로 위에서 변수 값만 변경해서 .select()에 뿌리는 방식
const excludedKeywordColumns: DrinkColums[] = [
  'alcohol_content',
  'sweetness',
  'acidity',
  'carbonation',
  'body',
];
//type, alcohol_content, sweetness, acidity, carbonation, body
const excludedTotalColumns: DrinkColums[] = ['id', 'name', 'type', 'image'];

const getColumnsExcept = (excluded: DrinkColums[]): string[] =>
  allColumns.filter((column) => !excluded.includes(column));

const selectedFilterColumns = allColumns.join(',');
const selectedKeywordColumns = getColumnsExcept(excludedKeywordColumns).join(
  ',',
);
const selectedTotalColumns = getColumnsExcept(excludedTotalColumns).join(',');

const getRange = (page: number, pageSize: number): [number, number] => {
  return [(page - 1) * pageSize, page * pageSize - 1];
};

// 필터값 sort
export async function filterSortedDrinks({
  types,
  alcoholStrength,
  tastePreferences,
  page = 1,
  pageSize = 20,
  sortBy = 'name',
  sortOrder = 'asc',
}: FilterParams): Promise<{
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
    .select(selectedFilterColumns, { count: 'exact' });

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

  // 에러 처리
  if (error) {
    throw new Error('Error fetching filtered data');
  }

  // 다음 페이지 존재유무 확인
  const hasNextPage = data.length === pageSize;
  const nextPage = hasNextPage ? page + 1 : null;

  // 객체 리터럴은 알려진 속성만 이용할 수 있어서
  // 제네릭 형태로 범용성 있는 형태로 사용이 안되는거 물어보기
  return {
    drinks: data as unknown as Drink[],
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
}: KeywordParams): Promise<{
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
    .select(selectedKeywordColumns, { count: 'exact' })
    .or(`name.ilike.%${keyword},type.ilike.%${keyword}%`) // name 또는 type에 keyword 포함
    .order(sortBy, { ascending: sortOrder === 'asc' })
    .range(offset, limit);

  if (error) {
    throw new Error('Error fetching data by keyword');
  }
  const hasNextPage = data.length === pageSize;
  const nextPage = hasNextPage ? page + 1 : null;
  return {
    drinks: (data as unknown as Drink[]) || [],
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
  likedDrinks: LikedDrinksWithCount[];
  nextPage: number | null;
  hasNextPage: boolean;
  totalCount: number;
}> => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('fetch_drinks_with_like_count');
  // 수정된 RPC 함수 호출

  if (error) {
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
  let query = supabase.from('drinks').select(selectedTotalColumns, {
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
