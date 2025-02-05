import { RefObject } from 'react';
import { Database } from './supabase';

// FocusInput 컴포넌트 Props
export type FocusInputProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  shouldShowResults: boolean;
  shouldHideFilterSidebar: boolean;
};

// TotalAndSort 컴포넌트 totalData Props
export type TotalAndSortProps = {
  totalData: number;
};

// StandByScreen 컴포넌트 className Props
export type StandBySCreenProps = {
  className?: string;
};

// SearchBar 컴포넌트 Props
export type SearchBarProps = {
  value: string;
  onChange: (val: string) => void;
  setSearchValue: (val: string) => void;
  shouldShowResults: boolean;
  inputRef: RefObject<HTMLInputElement>;
};

// RecommendCateGory 컴포넌트 Props
export type RecommendCateGory = {
  className?: string;
  setSearchValue: (val: string) => void;
  inputRef: RefObject<HTMLInputElement>;
};

// HomeScreenButtonProps 컴포넌트 Props

export type HomeScreenButtonProps = {
  className?: string;
};

// FilterItem 컴포넌트 Props
export type FilterItem = {
  label: string;
  value: string | number | [number, number];
  original: string;
};

// AlcholTatste 컴포넌트 Props
export type TasteRadioButtonProps = {
  category: string; // "단맛", "신맛" 등 맛 카테고리
};

// 단맛,신맛,쓴맛,바디감 타입
export type TastePreferences = {
  sweetness?: number;
  acidity?: number;
  carbonation?: number;
  body?: number;
};

// 필터 페이지네이션 타입
export type FilterParams = {
  types: string[];
  alcoholStrength?: [number, number] | null;
  tastePreferences?: TastePreferences;
  page?: number;
  pageSize?: number;
  sortBy?: keyof Drink;
  sortOrder?: 'asc' | 'desc';
};

// 검색 페이지네이션 타입
export type KeywordParams = {
  keyword: string;
  page?: number;
  pageSize?: number;
  sortBy?: keyof Drink;
  sortOrder?: 'asc' | 'desc';
};

// 좋아요 갯수 rpc 함수 타입
export type LikedDrinksWithCount =
  Database['public']['Functions']['fetch_drinks_with_like_count']['Returns'];

// 좋아하는 음료 타입
export type PopularDrinks = {
  id: string;
  name: string;
  image: string;
  like_count: number;
};

// 좋아요 음료 갯수 타입
export type DrinkWithLikeStats = {
  id: number; // 음료 ID
  name: string; // 음료 이름
  image: string; // 음료 이미지 URL
  like_count: number; // 각 음료의 좋아요 개수
  total_likes: number; // 전체 좋아요 개수
};

// InterSectionOberver 타입
export type UseIntersectionObserverParams = {
  hasNextPage: boolean; // 다음 페이지 존재 여부
  fetchNextPage: () => void; // 다음 페이지 데이터를 가져오는 함수
  threshold?: number; // 옵저버의 교차 임계값 (기본값: 1.0)
};

// GenerateUrl 타입
export type GenerateUrlType = {
  selectedTypes?: string[];
  alcoholStrength?: [number, number] | null;
  tastePreferences?: Record<string, any>;
  keyword?: string;
  sort?: string;
};

// DrinkColums 타입
export type DrinkColums =
  | 'id'
  | 'name'
  | 'type'
  | 'alcohol_content'
  | 'image'
  | 'sweetness'
  | 'acidity'
  | 'carbonation'
  | 'body';

export type Drink = Database['public']['Tables']['drinks']['Row'];
