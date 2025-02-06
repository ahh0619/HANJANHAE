'use client';


import { useRouter, useSearchParams } from 'next/navigation';

import useSortStore from '@/store/selectStore';

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
  const { selectedSort, setSelectedSort } = useSortStore();
  const handleValueChange = (value: string) => {
    const newValue =
      selectedSort === value
        ? value === 'alphabetical'
          ? 'liked'
          : 'alphabetical'
        : value;

    setSelectedSort(newValue);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('sort', newValue);
    router.push(`/search?${newSearchParams.toString()}`);
  };
  return (
    <Select value={selectedSort} onValueChange={handleValueChange}>
      <SelectTrigger className="shadow-none ring-0">
        <SelectValue placeholder={selectedSort} />
      </SelectTrigger>
      <SelectContent className="shadown-none ring-0">
        <SelectGroup className="h-[86px] rounded-[8px]">
          <SelectItem value="alphabetical">가나다 순</SelectItem>
          <SelectItem value="liked">좋아요 순</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectSorted;
