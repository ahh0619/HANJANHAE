type InfoRowProps = {
  label: string;
  value: string | null;
};

const DrinkInfoRow = ({ label, value }: InfoRowProps) => (
  <div className="flex justify-between">
    <p className="font-semibold">{label}</p>
    <p className="text-gray-700">{value || '정보 없음'}</p>
  </div>
);

export default DrinkInfoRow;
