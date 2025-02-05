import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';

import { transformCloudinaryUrl } from '@/utils/common/transformCloudinaryUrl';

import OptimizedImage from './OptimizedImage';

type PlaceCardProps = {
  id: string;
  name: string;
  image: string;
};

const PlaceCard = ({ id, name, image }: PlaceCardProps) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  const mobileUrl = transformCloudinaryUrl(image, 480);
  const desktopUrl = transformCloudinaryUrl(image, 996);

  return (
    <Link className="relative flex flex-col rounded-lg" href={`/place/${id}`}>
      <div className="relative aspect-[4/3] w-60 overflow-hidden rounded-lg xl:aspect-auto xl:h-[291px] xl:w-[498px]">
        <OptimizedImage
          src={isDesktop ? desktopUrl : mobileUrl}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="mt-3 w-full text-left text-title-mm xl:mt-5">{name}</div>
    </Link>
  );
};

export default PlaceCard;
