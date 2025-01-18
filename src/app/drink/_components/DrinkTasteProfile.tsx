type Drink = {
  sweetness: number | null;
  acidity: number | null;
  carbonation: number | null;
  body: number | null;
};

type DrinkTasteProfileProps = {
  drink: Drink;
};

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
      <div className="flex flex-1 items-center justify-end space-x-2">
        {/* 약함 */}
        <span className="text-caption-mm text-grayscale-500">약함</span>

        {/* Bars */}
        <div className="flex w-full max-w-52 space-x-1">
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
      <div className="space-y-4">
        {renderProfileRow('단맛', drink.sweetness)}
        {renderProfileRow('신맛', drink.acidity)}
        {renderProfileRow('청량감', drink.carbonation)}
        {renderProfileRow('바디감', drink.body)}
      </div>
    </section>
  );
};

export default DrinkTasteProfile;
