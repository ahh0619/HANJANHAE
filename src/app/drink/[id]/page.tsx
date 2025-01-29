import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { validate as uuid } from 'uuid';

import { fetchDrinks } from '@/app/actions/drink';

import DrinkDetailNavigator from '../_components/DrinkDetailNavigator';
import DrinkInfoAndTasteProfile from '../_components/DrinkInfoAndTasteProfile';
import DrinkOverviewSection from '../_components/DrinkOverviewSection';
import FoodPairing from '../_components/FoodPairing';
import Loading from '../_components/Loading';
import ReviewSection from '../_components/ReviewSection';

type DrinkDetailPageProps = {
  params: { id: string };
};

export const generateMetadata = async ({
  params,
}: DrinkDetailPageProps): Promise<Metadata> => {
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
  };
};

const DrinkDetailPage = ({ params }: DrinkDetailPageProps) => {
  if (!uuid(params.id)) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[1280px] xl:mt-8">
      <div className="relative flex flex-col justify-center xl:flex-row xl:gap-[126px]">
        <div className="flex-1 bg-etc-white xl:sticky xl:top-[102px] xl:h-[534px] xl:w-[430px] xl:flex-none xl:shrink-0">
          <Suspense fallback={<Loading />}>
            <DrinkOverviewSection drinkId={params.id} />
          </Suspense>
        </div>

        <div className="w-full xl:w-[534px] xl:flex-none">
          <div className="sticky top-[102px] z-10 mx-auto hidden bg-etc-white xl:block">
            <DrinkDetailNavigator />
          </div>

          <section id="info" className="xl:mx-auto xl:max-w-[486px]">
            <Suspense fallback={<Loading />}>
              <DrinkInfoAndTasteProfile drinkId={params.id} />
            </Suspense>

            <Suspense fallback={<Loading />}>
              <section className="mt-10 border-b px-5 xl:mt-[60px] xl:px-0">
                <FoodPairing drinkId={params.id} />
              </section>
            </Suspense>
          </section>

          <section id="review" className="xl:mx-auto xl:max-w-[486px]">
            <Suspense fallback={<Loading />}>
              <ReviewSection drinkId={params.id} />
            </Suspense>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DrinkDetailPage;
