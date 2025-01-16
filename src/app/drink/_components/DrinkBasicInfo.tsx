import { Database } from '@/types/supabase';

import DrinkInfoRow from './DrinkInfoRow';

type Drink = Database['public']['Tables']['drinks']['Row'];

const DrinkBasicInfo = ({ drink }: { drink: Drink }) => (
  <section className="p-4">
    <h3 className="text-lg font-bold">기본 정보</h3>
    <div className="mt-4 grid gap-y-3 text-sm">
      <DrinkInfoRow label="주종" value={drink.type} />
      <DrinkInfoRow label="도수" value={drink.alcohol_content} />
      <DrinkInfoRow label="용량" value={drink.volume} />
      <DrinkInfoRow label="제조사" value={drink.manufacturer} />
      <DrinkInfoRow label="원재료" value={drink.ingredients} />
    </div>
  </section>
);

export default DrinkBasicInfo;
