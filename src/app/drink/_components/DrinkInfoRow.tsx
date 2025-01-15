type InfoRowProps = {
  label: string;
  value: string | number | null;
};

const DrinkInfoRow = ({ label, value }: InfoRowProps) => {
  const formattedValue =
    typeof value === 'number' ? `${value}%` : value || '정보 없음';

  return (
    <div className="flex justify-between">
      <p className="font-semibold">{label}</p>
      <p className="text-gray-700">{formattedValue}</p>
    </div>
  );
};

export default DrinkInfoRow;
