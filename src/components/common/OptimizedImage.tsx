import Image, { ImageProps } from 'next/image';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  fill = false,
  ...props
}: ImageProps) => {
  const getIconDimensions = (src: string) => {
    if (!src) return { width, height };

    if (
      src.includes('chevron_right') ||
      src.includes('check') ||
      src.includes('cancelGray') ||
      src.includes('cancel-primary') ||
      src.includes('chevron-right')
    ) {
      return { width: 16, height: 16 };
    }
    if (src.includes('login') || src.includes('header'))
      return { width: 18, height: 18 };
    if (src.includes('sliders-v-alt-white')) return { width: 20, height: 20 };
    if (src.includes('back')) return { width: 40, height: 40 };
    if (src.includes('Radio')) return { width: 45, height: 40 };
    if (src.includes('share_button_')) return { width: 48, height: 48 };

    return { width: 24, height: 24 };
  };

  const dimensions = getIconDimensions(src as string);

  const computedWidth = fill ? undefined : (width ?? dimensions.width);
  const computedHeight = fill ? undefined : (height ?? dimensions.height);

  return (
    <Image
      src={src || ''}
      alt={alt}
      width={computedWidth}
      height={computedHeight}
      fill={fill}
      className={className}
      {...props}
    />
  );
};

export default OptimizedImage;
