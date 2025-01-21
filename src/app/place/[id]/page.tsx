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
    <div className="relative mx-auto max-w-96">
      <MainSection place={place} />
      <DetailSection place={place} />
    </div>
  );
};

export default PlaceDetail;
