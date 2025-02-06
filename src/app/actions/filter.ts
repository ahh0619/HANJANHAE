'use server';

import {
  Drink,
  DrinkColums,
  FilterParams,
  KeywordParams,
  LikedDrinksWithCount,
} from '@/types/search';
import { createClient } from '@/utils/supabase/client';

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

const excludedKeywordColumns: DrinkColums[] = [
  'alcohol_content',
  'sweetness',
  'acidity',
  'carbonation',
  'body',
];
const excludedTotalColumns: DrinkColums[] = ['id', 'name', 'type', 'image'];

const getColumnsExcept = (excluded: DrinkColums[]): string[] =>
  allColumns.filter((column) => !excluded.includes(column));

const selectedFilterColumns = allColumns.join(',');
const selectedKeywordColumns = [
  ...getColumnsExcept(excludedKeywordColumns),
  'name_nospace',
  'type_nospace',
].join(',');

const selectedTotalColumns = getColumnsExcept(excludedTotalColumns).join(',');

const getRange = (page: number, pageSize: number): [number, number] => {
  return [(page - 1) * pageSize, page * pageSize - 1];
};

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
  let query = supabase
    .from('drinks')
    .select(selectedFilterColumns, { count: 'exact' });

  if (types.length > 0) {
    query = query.in('type', types);
  }
  if (alcoholStrength) {
    const [min, max] = alcoholStrength;
    query = query.gte('alcohol_content', min).lte('alcohol_content', max);
  } else {
    query = query.gte('alcohol_content', 0).lte('alcohol_content', 100);
  }
  if (tastePreferences) {
    Object.entries(tastePreferences).forEach(([category, value]) => {
      query = query.eq(category, value);
    });
  }
  query = query.order(sortBy, { ascending: sortOrder === `asc` });

  const [offset, limit] = getRange(page, pageSize);
  query = query.range(offset, limit);

  const { data, count, error } = await query;

  if (error) {
    throw new Error('Error fetching filtered data');
  }

  const hasNextPage = data.length === pageSize;
  const nextPage = hasNextPage ? page + 1 : null;

  return {
    drinks: data as unknown as Drink[],
    nextPage,
    hasNextPage,
    totalCount: count || 0,
  };
}

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

  const [offset, limit] = getRange(page, pageSize);

  const { data, count, error } = await supabase
    .from('drinks')
    .select(selectedKeywordColumns, { count: 'exact' })
    .or(
      `name.ilike.%${keyword},type.ilike.%${keyword}%,name_nospace.ilike.%${keyword}%,type_nospace.ilike.%${keyword}%`,
    )
    .order(sortBy, { ascending: sortOrder === 'asc' })
    .range(offset, limit);

  if (error) {
    throw new Error('Error fetching data by keyword');
  }
  console.log(data);
  const hasNextPage = data.length === pageSize;
  const nextPage = hasNextPage ? page + 1 : null;
  return {
    drinks: (data as unknown as Drink[]) || [],
    nextPage,
    hasNextPage,
    totalCount: count || 0,
  };
}

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

  const sortedDrinks = data
    ? data.sort((a: any, b: any) => b.like_count - a.like_count)
    : [];

  const [offset] = getRange(page, pageSize);
  const paginatedLiked = sortedDrinks.slice(offset, offset + pageSize);

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
  totalCount: number;
}> {
  const supabase = createClient();

  let query = supabase.from('drinks').select(selectedTotalColumns, {
    count: 'exact',
    head: true,
  });

  if (types.length > 0) {
    query = query.in('type', types);
  }

  if (alcoholStrength) {
    const [min, max] = alcoholStrength;

    query = query.gte('alcohol_content', min).lte('alcohol_content', max);
  } else {
    query = query.gte('alcohol_content', 0).lte('alcohol_content', 100);
  }

  if (tastePreferences) {
    Object.entries(tastePreferences).forEach(([category, value]) => {
      query = query.eq(category, value);
    });
  }

  const { count, error } = await query;

  if (error) {
    throw new Error('Error fetching filtered data');
  }

  return {
    totalCount: count || 0,
  };
}
