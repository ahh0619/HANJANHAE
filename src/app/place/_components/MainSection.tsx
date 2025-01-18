import BackButton from '@/components/common/BackButton';
import ShareButton from '@/components/common/ShareButton';
import { PlaceWithMenusType } from '@/types/place';

type MainSectionProps = {
  place: PlaceWithMenusType;
};

const MainSection = ({ place }: MainSectionProps) => {
  return (
    <>
      <div className="relative">
        <BackButton className="absolute left-2 top-2" />
        <div className="flex h-64 w-full items-center justify-center overflow-hidden bg-gray-200">
          <img
            className="h-full w-full object-cover"
            src={place.image}
            alt={place.name}
          />
        </div>
      </div>

      <div className="flex items-center justify-between px-2">
        <p className="text-xl font-bold">{place.name}</p>
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
