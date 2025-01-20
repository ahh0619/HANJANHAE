'use client';


import useSortStore from '@/store/selectStore';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './_ui/Select';

export function SelectSorted() {
  const { selectedSort, setSelectedSort } = useSortStore();
  return (
    <Select value={selectedSort} onValueChange={setSelectedSort}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder={selectedSort} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="alphabetical">가나다 순</SelectItem>
          <SelectItem value="liked">좋아요 순</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
