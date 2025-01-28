import { DrinkType } from '@/types/drink';

import DrinkInfoRow from './DrinkInfoRow';

const DrinkBasicInfo = ({ drink }: { drink: DrinkType }) => (
  <section className="!mt-8 px-5 xl:px-0">
    <h3 className="text-title-lb">기본 정보</h3>
    <div className="mt-4 grid gap-y-3 text-body-mm text-grayscale-900 xl:mt-5">
      <DrinkInfoRow label="주종" value={drink.type} />
      <DrinkInfoRow label="도수" value={drink.alcohol_content} />
      <DrinkInfoRow label="용량" value={drink.volume} />
      <DrinkInfoRow label="제조사" value={drink.manufacturer} />
      <DrinkInfoRow label="원재료" value={drink.ingredients} />
    </div>
  </section>
);

export default DrinkBasicInfo;
