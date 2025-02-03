import Link from 'next/link';

import OptimizedImage from './OptimizedImage';

type PlaceCardProps = {
  id: string;
  name: string;
  image: string;
};

const PlaceCard = ({ id, name, image }: PlaceCardProps) => {
  return (
    <Link className="relative flex flex-col rounded-lg" href={`/place/${id}`}>
      <div className="relative aspect-[4/3] w-60 overflow-hidden rounded-lg xl:aspect-auto xl:h-[291px] xl:w-[498px]">
        <OptimizedImage src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="mt-3 w-full text-left text-title-mm xl:mt-5">{name}</div>
    </Link>
  );
};

export default PlaceCard;
