import BackButton from '@/components/common/BackButton';

const DrinkImage = ({
  image,
  name,
}: {
  image: string | null;
  name: string;
}) => (
  <div className="relative">
    <BackButton className="absolute left-2 top-2" />
    <div className="flex h-64 w-full items-center justify-center rounded-lg">
      {image ? (
        <img
          src={image}
          alt={name}
          className="h-auto max-h-full w-auto max-w-full rounded-lg object-contain"
        />
      ) : (
        <p className="text-lg font-semibold">대표이미지</p>
      )}
    </div>
  </div>
);

export default DrinkImage;
