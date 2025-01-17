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
        className="rounded-lg border border-grayscale-300 p-3 text-caption-lm"
        type={type}
        id={id as string}
        autoComplete="off"
        {...register(id)}
      />
      <p className="text-caption-sm text-grayscale-600">{error ?? '\u00A0'}</p>
    </div>
  );
};

export default InputField;
