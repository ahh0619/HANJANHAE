'use client';

import { useEffect, useState } from 'react';

import useFilterStore from '@/store/filterStore';
import useResults from '@/store/resultStore';
import {
  filterDrinks,
  FilterParams,
  getPopularDrinks,
} from '@/utils/filter/action';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './_ui/Select';

export function FilterSorted() {
  const [selectedValue, setSelectedValue] = useState('regular');
  const { results, setResults } = useResults(); // results와 setResults 가져오기

  // 필터 상태
  const {
    selectedTypes,

    alcoholStrength,

    tastePreferences,
  } = useFilterStore();

  // 필터 기반 데이터 가져오기
  const fetchFilteredResults = async () => {
    try {
      const filterParams: FilterParams = {
        types: selectedTypes,
        alcoholStrength,
        tastePreferences,
      };

      const filteredResults = await filterDrinks(filterParams);
      setResults(filteredResults); // results 스토어에 저장
    } catch (error) {
      console.error('Error fetching filtered results:', error);
    }
  };

  useEffect(() => {
    const sortResults = async () => {
      if (selectedValue === 'likedSort') {
        // 좋아요 순 데이터 가져오기
        const popularDrinks = await getPopularDrinks();
        setResults(popularDrinks);
      } else if (selectedValue === 'regular') {
        // 기본순 정렬 (필터 값 기준으로 가져오기)
        fetchFilteredResults();
      } else if (selectedValue === 'letterSort') {
        // 가나다 순 정렬
        const sortedResults = [...results].sort((a, b) =>
          a.name.localeCompare(b.name, 'ko'),
        );
        setResults(sortedResults); // 정렬된 데이터 업데이트
      }
    };

    sortResults();
  }, [selectedValue]);

  return (
    <Select value={selectedValue} onValueChange={setSelectedValue}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder={selectedValue} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="regular">기본순</SelectItem>
          <SelectItem value="likedSort">좋아요 순</SelectItem>
          <SelectItem value="letterSort">가나다 순</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
