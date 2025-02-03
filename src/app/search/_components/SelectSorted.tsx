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

export function SelectSorted() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedSort, setSelectedSort } = useSortStore();
  const handleValueChange = (value: string) => {
    // 현재 값과 전달받은 값이 같다면 토글:
    // 만약 현재가 'alphabetical'이면 'liked'로, 'liked'이면 'alphabetical'로 변경
    
    // 주석이 없으면 읽기가 힘든 코드 
    // 나쁜 것은 아니나 이렇게 할바엔 함수로 만드는게 나을 것 같다
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
      <SelectTrigger>
        <SelectValue placeholder={selectedSort} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="rounded-[8px] shadow-select">
          <SelectItem value="alphabetical">가나다 순</SelectItem>
          <SelectItem value="liked">좋아요 순</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
