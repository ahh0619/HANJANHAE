import Image from 'next/image';

import BackButton from '@/components/common/BackButton';

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
    <div className="relative h-[420px] w-full overflow-hidden rounded-b-2xl border border-grayscale-200">
      {image ? (
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="contain"
          className="rounded-b-lg"
        />
      ) : (
        <p className="text-lg font-semibold">대표이미지</p>
      )}
    </div>
  </div>
);

export default DrinkImage;
