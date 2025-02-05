import { SelectSorted } from './SelectSorted';

type TotalAndSortProps = {
  totalData: number;
};

const TotalAndSort: React.FC<TotalAndSortProps> = ({ totalData }) => {
  console.log(totalData);
  return (
    <div className="mt-[16px] flex w-full max-w-md items-center justify-between border-t border-[#E0E0E0] pt-[0] xl:mt-[0] xl:w-[1200px] xl:max-w-none xl:pt-[16px]">
      <span className="text-xs font-medium not-italic leading-[1.5] text-grayscale-900">
        {totalData}개의 검색결과가 있어요
      </span>
      <SelectSorted />
    </div>
  );
};

export default TotalAndSort;
