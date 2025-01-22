import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type InputFieldProps<T extends FieldValues> = {
  id: Path<T>;
  label: string;
  type?: string;
  register: UseFormRegister<T>;
  error?: string;
};

const InputField = <T extends FieldValues>({
  id,
  label,
  type = 'text',
  register,
  error,
}: InputFieldProps<T>) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-title-mm" htmlFor={id as string}>
        {label}
      </label>
      <input
        className={`rounded-[8px] border ${error ? 'border-etc-red' : 'border-grayscale-300'} p-3 text-caption-lm focus:outline-none ${error ? 'focus:border-etc-red' : 'focus:border-grayscale-900'}`}
        type={type}
        id={id as string}
        autoComplete="off"
        {...register(id)}
      />
      <p className="text-caption-sm text-etc-red">{error ?? '\u00A0'}</p>
    </div>
  );
};

export default InputField;
