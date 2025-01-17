type CheckFieldProps = {
  category: string;
  id: string;
  label: string;
  checked?: boolean;
  handleChange?: () => void;
};

const CheckField = ({
  category,
  id,
  label,
  checked,
  handleChange,
}: CheckFieldProps) => {
  return (
    <>
      {category === 'signup' && (
        <div className="flex items-center gap-2 py-2">
          <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={handleChange}
          />
          <label className="text-body-sm text-grayscale-900" htmlFor={id}>
            {label}
          </label>
        </div>
      )}

      {category === 'signin' && (
        <div className="flex items-center gap-2 py-2">
          <input type="checkbox" id={id} />
          <label className="text-label-lm text-grayscale-900" htmlFor={id}>
            {label}
          </label>
        </div>
      )}
    </>
  );
};

export default CheckField;
