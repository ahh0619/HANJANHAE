import { Suspense } from 'react';

import SearchWrap from './_components/SearchWrap';

const Search = () => {
  return (
    <>
      <Suspense fallback={<div>로딩 중</div>}>
        <SearchWrap />
      </Suspense>
    </>
  );
};

export default Search;
