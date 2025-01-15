import { fetchPlace } from '@/utils/place/action';

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
    <div className="mx-auto flex w-full max-w-96 flex-col gap-4">
      <MainSection place={place} />
      <DetailSection place={place} />
    </div>
  );
};

export default PlaceDetail;
