import { DrinkTasteProfileProps } from '@/types/drink';

const DrinkTasteProfile: React.FC<DrinkTasteProfileProps> = ({ drink }) => {
  const renderBar = (value: number | null | undefined, index: number) => {
    const colors = [
      'bg-secondary-200',
      'bg-secondary-300',
      'bg-primary-100',
      'bg-primary-200',
      'bg-primary-300',
    ];

    return (
      <div
        key={index}
        className={`h-4 w-9 ${
          value && index < value ? colors[index] : 'bg-etc-white'
        }`}
      />
    );
  };

  const renderProfileRow = (
    label: string,
    value: number | null | undefined,
  ) => (
    <div className="flex w-full items-center justify-between">
      {/* Label */}
      <div>
        <span className="w-16 text-body-mm text-grayscale-900">{label}</span>
      </div>

      {/* 약함과 Bars */}
      <div className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-x-1">
        {/* 약함 */}
        <span className="text-caption-mm text-grayscale-500">약함</span>

        {/* Bars */}
        <div className="flex max-w-[246px] flex-1 space-x-1">
          {[...Array(5)].map((_, i) => renderBar(value, i))}
        </div>

        {/* 강함 */}
        <span className="text-caption-mm text-grayscale-500">강함</span>
      </div>
    </div>
  );

  return (
    <section className="mt-8 px-5">
      <h3 className="mb-4 text-title-lm text-grayscale-900">맛 프로필</h3>
      <div className="space-y-3">
        {renderProfileRow('단맛', drink.sweetness)}
        {renderProfileRow('신맛', drink.acidity)}
        {renderProfileRow('청량감', drink.carbonation)}
        {renderProfileRow('바디감', drink.body)}
      </div>
    </section>
  );
};

export default DrinkTasteProfile;
