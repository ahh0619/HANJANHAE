import Image from 'next/image';

type ButtonProps = {
  category?: string;
  label: string;
  handleClick?: () => void;
};

const Button = ({ category = 'main', label, handleClick }: ButtonProps) => {
  return (
    <>
      {category === 'main' && (
        <button
          type="submit"
          className="w-full rounded-[8px] bg-primary p-3 text-label-xlm text-grayscale-100"
          onClick={handleClick}
        >
          {label}
        </button>
      )}

      {category === 'option' && (
        <p
          className="cursor-pointer p-3 text-label-lm text-grayscale-500"
          onClick={handleClick}
        >
          {label}
        </p>
      )}

      {category === 'google' && (
        <div
          className="flex w-full cursor-pointer justify-center gap-2 rounded-full border border-grayscale-200 bg-etc-white p-3"
          onClick={handleClick}
        >
          <Image
            width={24}
            height={24}
            src="/assets/icons/auth_google.svg"
            alt="social_google"
          />
          <p className="text-label-lm text-grayscale-600">{label}</p>
        </div>
      )}

      {category === 'kakao' && (
        <div
          className="flex w-full cursor-pointer justify-center gap-2 rounded-full bg-etc-yellow p-3"
          onClick={handleClick}
        >
          <Image
            width={24}
            height={24}
            src="/assets/icons/auth_kakao.svg"
            alt="social_kakao"
          />
          <p className="text-label-lm">{label}</p>
        </div>
      )}

      {category === 'email' && (
        <div
          className="flex w-full cursor-pointer justify-center gap-2 rounded-full bg-grayscale-700 p-3"
          onClick={handleClick}
        >
          <Image
            width={24}
            height={24}
            src="/assets/icons/auth_email.svg"
            alt="social_email"
          />
          <p className="text-label-lm text-etc-white">{label}</p>
        </div>
      )}

      {category === 'detail' && (
        <div className="flex cursor-pointer items-center p-3">
          <p className="text-label-mm text-grayscale-500" onClick={handleClick}>
            {label}
          </p>
          <Image
            width={16}
            height={16}
            src="/assets/icons/chevron_right.svg"
            alt="chevron_right"
          />
        </div>
      )}

      {category === 'back' && (
        <button
          type="button"
          className="absolute left-2 top-[2px] flex items-center justify-center"
          onClick={handleClick}
        >
          <Image
            width={40}
            height={40}
            src="/assets/icons/back.svg"
            alt="back"
          />
        </button>
      )}

      {category === 'cancel' && (
        <p
          className="absolute right-2 top-[2px] flex h-10 w-10 cursor-pointer items-center justify-center text-label-lm text-grayscale-900"
          onClick={handleClick}
        >
          {label}
        </p>
      )}
    </>
  );
};

export default Button;
