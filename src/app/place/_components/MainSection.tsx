'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@/components/auth/Button';
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
        <Button category="back-place" label="" handleClick={() => router.back()} />
        <Image
          className="mb-3 h-[280px] w-full object-cover"
          width={280}
          height={280}
          src={place.image}
          alt={place.name}
        />
      </div>

      <div className="mb-3 flex items-center justify-between px-2 px-5">
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
