import { Database } from '@/types/supabase';

import DrinkInfoRow from './DrinkInfoRow';

type Drink = Database['public']['Tables']['drinks']['Row'];

const DrinkBasicInfo = ({ drink }: { drink: Drink }) => (
  <section className="border-b p-4">
    <h3 className="text-lg font-bold">기본 정보</h3>
    <div className="mt-1">
      <p className="mt-1 text-sm text-gray-500">
        {drink.ingredients || '재료 정보 없음'}
      </p>
      <div className="mt-2 space-y-2 text-sm">
        <DrinkInfoRow label="주종" value={drink.type} />
        <DrinkInfoRow label="도수" value={drink.alcohol_content} />
        <DrinkInfoRow label="용량" value={drink.volume} />
        <DrinkInfoRow label="제조사" value={drink.manufacturer} />
      </div>
    </div>
  </section>
);

export default DrinkBasicInfo;
