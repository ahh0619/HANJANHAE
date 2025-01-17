import Link from 'next/link';

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
        <img
          src={image}
          alt={name}
          className="h-full w-full rounded-lg object-cover"
        />
      </div>
      {/* 이름 */}
      <div className="mt-2 w-full text-left text-title-mm">{name}</div>
    </Link>
  );
};

export default PlaceCard;
