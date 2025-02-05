import { Suspense } from 'react';

import SearchWrap from './_components/SearchWrap';

const SearchPage = () => {
  return (
    <Suspense>
      <SearchWrap />
    </Suspense>
  );
};

export default SearchPage;
