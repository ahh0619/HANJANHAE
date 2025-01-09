import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type InputFieldProps<T extends FieldValues> = {
  id: Path<T>;
  label: string;
  type?: string;
  placeholder: string;
  register: UseFormRegister<T>;
  error?: string;
};

const InputField = <T extends FieldValues>({
  id,
  label,
  type = 'text',
  placeholder,
  register,
  error,
}: InputFieldProps<T>) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-bold" htmlFor={id as string}>
        {label}
      </label>
      <input
        className="border border-black p-2"
        type={type}
        id={id as string}
        placeholder={placeholder}
        autoComplete="off"
        {...register(id)}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
