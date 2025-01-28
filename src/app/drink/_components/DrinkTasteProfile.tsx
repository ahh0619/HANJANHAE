import React from 'react';

import { DrinkTasteProfileProps } from '@/types/drink';

const TASTE_PROFILE_COLORS = [
  'bg-secondary-200',
  'bg-secondary-300',
  'bg-primary-100',
  'bg-primary-200',
  'bg-primary-300',
];

type TasteProfileRowProps = {
  label: string;
  value: number | null | undefined;
};

const TasteProfileRow: React.FC<TasteProfileRowProps> = ({ label, value }) => {
  return (
    <div className="flex w-[336px] items-center gap-x-12 xl:w-[486px] xl:gap-x-14">
      {/* 라벨 */}
      <div>
        <p className="w-[42px] text-body-mm text-grayscale-900">{label}</p>
      </div>

      {/* 약함과 Bars */}
      <div className="flex items-center gap-x-1">
        <span className="text-caption-mm text-grayscale-500">약함</span>

        {/* 5칸짜리 바들 */}
        <div className="flex max-w-[246px] flex-1 space-x-1">
          {Array.from({ length: 5 }).map((_, i) => {
            const colorClass =
              value && i < value ? TASTE_PROFILE_COLORS[i] : 'bg-etc-white';

            return <div key={i} className={`h-4 w-9 ${colorClass}`} />;
          })}
        </div>

        <span className="text-caption-mm text-grayscale-500">강함</span>
      </div>
    </div>
  );
};

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
