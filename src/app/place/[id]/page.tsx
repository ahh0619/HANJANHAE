import { fetchPlace } from '@/app/actions/place';

import DetailSection from '../_components/DetailSection';
import MainSection from '../_components/MainSection';

type PlaceDetailProps = {
  params: {
    id: string;
  };
};

const PlaceDetail = async ({ params }: PlaceDetailProps) => {
  const place = await fetchPlace(params.id);

  return (
    <div className="relative mx-auto -mb-32 xl:mt-8 xl:flex xl:max-w-[1280px] xl:items-start xl:justify-between xl:px-16">
      <MainSection place={place} />
      <DetailSection place={place} />
    </div>
  );
};

export default PlaceDetail;
