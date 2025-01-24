import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { validate as uuid } from 'uuid';

import { fetchDrinks } from '@/app/actions/drink';

import DrinkSection from '../_components/DrinkSection';
import FoodPairing from '../_components/FoodPairing';
import Loading from '../_components/Loading';
import ReviewSection from '../_components/ReviewSection';

type DrinkDetailPageProps = {
  params: { id: string };
};

export async function generateMetadata({
  params,
}: DrinkDetailPageProps): Promise<Metadata> {
  const drink = await fetchDrinks(params.id);

  if (!drink) {
    return {
      title: '주류 정보를 찾을 수 없습니다',
      description: '요청하신 주류 정보를 찾을 수 없습니다. 다시 확인해주세요.',
    };
  }

  return {
    title: `${drink.name} - 한잔해`,
    description: `${drink.name}에 대한 상세 정보와 추천 페어링 음식을 확인하세요.`,
    icons: {
      icon: 'assets/icons/favicon.svg',
    },
  };
}

const DrinkDetailPage = ({ params }: DrinkDetailPageProps) => {
  if (!uuid(params.id)) {
    notFound();
  }

  return (
    <div className="mx-auto">
      <div className="relative">
        {/* Drink Section */}
        <Suspense fallback={<Loading />}>
          <DrinkSection drinkId={params.id} />
        </Suspense>

        {/* Food Pairing Section */}
        <Suspense fallback={<Loading />}>
          <section className="mt-10 border-b px-5">
            <FoodPairing drinkId={params.id} />
          </section>
        </Suspense>

        {/* Review Section */}
        <Suspense fallback={<Loading />}>
          <ReviewSection drinkId={params.id} />
        </Suspense>
      </div>
    </div>
  );
};

export default DrinkDetailPage;
