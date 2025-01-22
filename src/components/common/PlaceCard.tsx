import Link from 'next/link';

import OptimizedImage from './OptimizedImage';

type PlaceCardProps = {
  id: string;
  name: string;
  image: string;
};

const PlaceCard = ({ id, name, image }: PlaceCardProps) => {
  return (
    <Link
      className="relative flex w-60 flex-col rounded-lg"
      href={`/place/${id}`}
    >
      {/* 이미지 */}
      <div className="aspect-[4/3] w-full overflow-hidden">
        <OptimizedImage
          src={image}
          alt={name}
          fill
          className="h-full w-full rounded-lg object-cover"
        />
      </div>
      {/* 이름 */}
      <div className="mt-3 w-full text-left text-title-mm">{name}</div>
    </Link>
  );
};

export default PlaceCard;
