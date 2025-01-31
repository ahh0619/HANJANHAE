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
      <SelectTrigger>
        <SelectValue placeholder={selectedSort} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="shadow-select rounded-[8px]">
          <SelectItem value="alphabetical">가나다 순</SelectItem>
          <SelectItem value="liked">좋아요 순</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
