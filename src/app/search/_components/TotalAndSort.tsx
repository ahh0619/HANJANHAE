import { SelectSorted } from './SelectSorted';

const TotalAndSort = ({ filterSortTotal, searchSortTotal, likedTotal }) => {
  return (
    <div className="mt-[16px] flex w-full max-w-md items-center justify-between">
      <span className="text-xs font-medium not-italic leading-[1.5] text-grayscale-900">
        {filterSortTotal || searchSortTotal || likedTotal}개의 검색결과가
        있습니다.
      </span>
      <SelectSorted />
    </div>
  );
};

export default TotalAndSort;
