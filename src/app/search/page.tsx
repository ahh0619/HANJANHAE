import { Suspense } from 'react';

import SearchWrap from './_components/SearchWrap';

export default function SearchPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SearchWrap />
    </Suspense>
  );
}
