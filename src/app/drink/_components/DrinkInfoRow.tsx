import { formatDrinkInfoValue } from '@/utils/drink/formatValue';

type InfoRowProps = {
  label: string;
  value: string | number | null;
};

const DrinkInfoRow = ({ label, value }: InfoRowProps) => {
  const formattedValue = formatDrinkInfoValue(value);

  return (
    <div className="grid grid-cols-[60px,1fr] gap-x-4">
      <p className="text-body-mm text-grayscale-700">{label}</p>
      <p className="text-body-mm text-grayscale-900">{formattedValue}</p>
    </div>
  );
};

export default DrinkInfoRow;
