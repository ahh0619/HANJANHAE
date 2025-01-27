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
    <div className="flex w-[336px] items-center gap-x-12 xl:w-[486px] xl:gap-x-14">
      {/* Label */}
      <div>
        <p className="w-[42px] text-body-mm text-grayscale-900">{label}</p>
      </div>

      {/* 약함과 Bars */}
      <div className="flex items-center gap-x-1">
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
      <h3 className="mb-4 text-title-lb text-grayscale-900">맛 프로필</h3>
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
