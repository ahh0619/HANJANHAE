'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/auth/Button';
import OptimizedImage from '@/components/common/OptimizedImage';
import ShareButton from '@/components/common/ShareButton';
import { PlaceWithMenusType } from '@/types/place';

type MainSectionProps = {
  place: PlaceWithMenusType;
};

const MainSection = ({ place }: MainSectionProps) => {
  const router = useRouter();

  return (
    <>
      <div className="relative">
        <Button
          category="back-place"
          label=""
          handleClick={() => router.back()}
        />
        <OptimizedImage
          src={place.image}
          alt={place.name}
          className="mb-3 h-[280px] w-full rounded-[8px] object-cover"
          width={375}
          height={280}
        />
      </div>

      <div className="mb-3 flex items-center justify-between px-5">
        <p className="text-title-xl text-grayscale-900">{place.name}</p>
        <ShareButton
          title={place.name}
          text={place.address}
          imageUrl={place.image}
        />
      </div>
    </>
  );
};

export default MainSection;
