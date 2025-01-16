type InfoRowProps = {
  label: string;
  value: string | number | null;
};

const DrinkInfoRow = ({ label, value }: InfoRowProps) => {
  const formattedValue =
    typeof value === 'number' ? `${value}%` : value || '정보 없음';

  return (
    <div className="grid grid-cols-[60px,1fr] gap-x-4">
      <p className="font-semibold text-gray-600">{label}</p>
      <p className="text-gray-700">{formattedValue}</p>
    </div>
  );
};

export default DrinkInfoRow;
