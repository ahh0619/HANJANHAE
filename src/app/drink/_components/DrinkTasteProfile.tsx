import React from 'react';

import { DrinkTasteProfileProps } from '@/types/drink';

import TasteProfileRow from './TasteProfileRow';

const DrinkTasteProfile: React.FC<DrinkTasteProfileProps> = ({ drink }) => {
  return (
    <section className="mt-8 px-5 xl:mt-[60px] xl:px-0">
      <h3 className="mb-4 text-title-lb text-grayscale-900 xl:mb-5">
        맛 프로필
      </h3>
      <div className="space-y-3">
        <TasteProfileRow label="단맛" value={drink.sweetness} />
        <TasteProfileRow label="신맛" value={drink.acidity} />
        <TasteProfileRow label="청량감" value={drink.carbonation} />
        <TasteProfileRow label="바디감" value={drink.body} />
      </div>
    </section>
  );
};

export default DrinkTasteProfile;
