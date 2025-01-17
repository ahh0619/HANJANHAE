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
    <div className="absolute -top-3 left-2 z-10 p-2">
      <BackButton />
    </div>

    {/* Image */}
    <div className="relative h-64 w-full overflow-hidden rounded-2xl">
      {image ? (
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="contain"
          className="rounded-2xl"
        />
      ) : (
        <p className="text-lg font-semibold">대표이미지</p>
      )}
    </div>
  </div>
);

export default DrinkImage;
