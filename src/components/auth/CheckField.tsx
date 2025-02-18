import OptimizedImage from '../common/OptimizedImage';

type CheckFieldProps = {
  id: string;
  label: string;
  checked: boolean;
  handleChange: () => void;
};

const CheckField = ({ id, label, checked, handleChange }: CheckFieldProps) => {
  return (
    <div className="py-2">
      <input
        className="peer hidden"
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
      />
      <label
        className={`flex items-center gap-2 text-body-sm ${id === 'all' ? 'text-grayscale-500' : 'text-grayscale-900'}`}
        htmlFor={id}
      >
        <OptimizedImage
          width={24}
          height={24}
          src={`/assets/icons/checkbox_${checked ? 'checked' : 'unchecked'}.svg`}
          alt="checkbox"
        />
        {label}
      </label>
    </div>
  );
};

export default CheckField;
