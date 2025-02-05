import { useEffect, useState } from 'react';

import { getDrinkCount } from '@/app/actions/filter';
import useFilterStore from '@/store/filterStore';
import { FilterParams } from '@/types/search';

const useDrinkCount = () => {
  const { selectedTypes, alcoholStrength, tastePreferences } = useFilterStore();
  const [totalCount, setTotalCount] = useState(0);
  const filterParams: FilterParams = {
    types: selectedTypes,
    alcoholStrength,
    tastePreferences,
  };

  useEffect(() => {
    const updateCount = async () => {
      const { totalCount } = await getDrinkCount(filterParams);
      setTotalCount(totalCount);
    };
    updateCount();
  }, [selectedTypes, alcoholStrength, tastePreferences]);

  return totalCount;
};

export default useDrinkCount;
