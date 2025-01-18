import { fetchUser } from '@/utils/auth/action';

import ResultList from './ResultList';

const FilterSearchResults = async () => {
  // fetchUser로 정보 불러와서 바로바로 좋아요 해결
  const user = await fetchUser();

  return (
    <div className="px-[20px]">
      <ResultList user={user}/>
    </div>
  );
};

export default FilterSearchResults;
