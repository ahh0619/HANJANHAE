import OptimizedImage from '../common/OptimizedImage';

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

      {category === 'modal' && (
        <button
          type="submit"
          className="w-full rounded-[8px] bg-primary p-3 text-title-mb text-grayscale-100"
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
          <OptimizedImage
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
          <OptimizedImage
            src="/assets/icons/auth_kakao.svg"
            alt="social_kakao"
          />
          <p className="text-label-lm">{label}</p>
        </div>
      )}

      {category === 'detail' && (
        <div className="flex cursor-pointer items-center p-3">
          <p className="text-label-mm text-grayscale-500" onClick={handleClick}>
            {label}
          </p>
          <OptimizedImage
            src="/assets/icons/chevron_right.svg"
            alt="chevron_right"
          />
        </div>
      )}

      {category.includes('back') && (
        <button
          type="button"
          className="absolute left-2 top-[2px] flex items-center justify-center z-20"
          onClick={handleClick}
        >
          <OptimizedImage
            src={`/assets/icons/${category === 'back' ? 'back' : 'back_gray'}.svg`}
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
