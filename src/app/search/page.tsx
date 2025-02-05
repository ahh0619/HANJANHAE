import { Suspense } from 'react';

import SearchWrap from './_components/SearchWrap';

export default function SearchPage() {
  return (
    <Suspense>
      <SearchWrap />
    </Suspense>
  );
}
