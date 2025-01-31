'use client';

import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';

import Button from '@/components/auth/Button';
import OptimizedImage from '@/components/common/OptimizedImage';
import ShareButton from '@/components/common/ShareButton';
import { PlaceWithMenusType } from '@/types/place';

type MainSectionProps = {
  place: PlaceWithMenusType;
};

const MainSection = ({ place }: MainSectionProps) => {
  const router = useRouter();

  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  return (
    <div className="xl:sticky xl:top-[102px] xl:shrink-0 xl:pb-[200px]">
      <div className="relative">
        <Button
          category="back-place"
          label=""
          handleClick={() => router.back()}
        />
        <OptimizedImage
          src={place.image}
          alt={place.name}
          className="mb-3 h-[280px] w-full rounded-[8px] object-cover xl:h-[337px] xl:w-[486px]"
          width={isDesktop ? 486 : 375}
          height={isDesktop ? 337 : 280}
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
    </div>
  );
};

export default MainSection;
