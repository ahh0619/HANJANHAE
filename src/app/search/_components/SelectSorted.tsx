'use client';


import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './_ui/Select';
const SelectSorted = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedSort, setSelectedSort] = useState(
    searchParams.get('sort') || 'liked',
  );

  const getNewSortValue = (currentSort: string, clickedValue: string) => {
    return currentSort === clickedValue
      ? clickedValue === 'alphabetical'
        ? 'liked'
        : 'alphabetical'
      : clickedValue;
  };
  const handleValueChange = (value: string) => {
    const newValue = getNewSortValue(selectedSort, value);
    setSelectedSort(newValue);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('sort', newValue);
    router.push(`/search?${newSearchParams.toString()}`);
  };
  return (
    <Select value={selectedSort} onValueChange={handleValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={selectedSort} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="h-[86px] rounded-[8px]">
          <SelectItem value="alphabetical">가나다 순</SelectItem>
          <SelectItem value="liked">좋아요 순</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectSorted;
