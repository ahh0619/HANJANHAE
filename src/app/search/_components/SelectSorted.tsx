'use client';
import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './_ui/Select';

export function SelectSorted() {
  // 상태 관리: 선택된 값
  const [selectedValue, setSelectedValue] = useState('regular');

  return (
    <Select value={selectedValue} onValueChange={setSelectedValue}>
      <SelectTrigger className="w-[100px]">
        {/* 최초 선택된 값이 placeholder로 표시됨 */}
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
