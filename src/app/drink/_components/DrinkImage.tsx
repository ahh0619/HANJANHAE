import BackButton from '@/components/common/BackButton';
import OptimizedImage from '@/components/common/OptimizedImage';

const DrinkImage = ({
  image,
  name,
}: {
  image: string | null;
  name: string;
}) => (
  <div className="relative">
    {/* Back Button */}
    <div className="absolute left-0 top-1 z-10 p-2">
      <BackButton />
    </div>

    {/* Image */}
    <div className="relative h-[420px] w-full overflow-hidden rounded-b-2xl border-b border-grayscale-200 bg-etc-white xl:rounded-2xl xl:border">
      {image ? (
        <OptimizedImage
          src={image}
          alt={name}
          fill
          className="rounded-b-2xl object-contain"
        />
      ) : (
        <p className="text-lg font-semibold">대표이미지</p>
      )}
    </div>
  </div>
);

export default DrinkImage;
