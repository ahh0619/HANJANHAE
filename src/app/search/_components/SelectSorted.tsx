'use client';

import { useEffect, useState } from 'react';

import useSearchStore from '@/store/keywordStore';
import useSearchResults from '@/store/searchResultStore';
import { filterDrinksByKeyword, getPopularDrinks } from '@/utils/filter/action';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './_ui/Select';

export function SelectSorted() {
  const [selectedValue, setSelectedValue] = useState('regular');
  const { setResults } = useSearchResults();
  const { keyword } = useSearchStore();

  useEffect(() => {
    // 선택된 정렬 방식에 따라 데이터를 가져오고 스토어에 업데이트
    const fetchSortedDrinks = async () => {
      try {
        if (selectedValue === 'likedSort') {
          // 좋아요 순 데이터 가져오기
          const popularDrinks = await getPopularDrinks();
          setResults(popularDrinks);
        } else if (selectedValue === 'regular') {
          // 기본순 (키워드 기반 데이터 가져오기)
          if (keyword) {
            const drinksByKeyword = await filterDrinksByKeyword(keyword);
            setResults(drinksByKeyword);
          }
        } else if (selectedValue === 'letterSort') {
          // 가나다 순 정렬
          if (keyword) {
            const drinksByKeyword = await filterDrinksByKeyword(keyword);
            const sortedDrinks = drinksByKeyword.sort((a, b) =>
              a.name.localeCompare(b.name, 'ko'),
            );
            setResults(sortedDrinks);
          }
        }
      } catch (error) {
        console.error('Error fetching sorted drinks:', error);
      }
    };

    fetchSortedDrinks();
  }, [selectedValue, keyword, setResults]);

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
