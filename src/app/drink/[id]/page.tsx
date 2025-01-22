import { Metadata } from 'next';

import { fetchDrinks } from '@/app/actions/drink';
import { fetchFoodPairings } from '@/app/actions/foodpairing';
import DrinkDetail from '@/app/drink/_components/DrinkDetail';

type DrinkDetailPageProps = {
  params: { id: string };
};

export async function generateMetadata({
  params,
}: DrinkDetailPageProps): Promise<Metadata> {
  const drinkUrlName = decodeURIComponent(params.id);
  const drink = await fetchDrinks(drinkUrlName);

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

const DrinkDetailPage = async ({ params }: DrinkDetailPageProps) => {
  const drinkUrlName = decodeURIComponent(params.id);
  const drink = await fetchDrinks(drinkUrlName);
  const foodPairings = await fetchFoodPairings(drink.id);

  if (!drink) {
    return (
      <div className="mx-auto p-4 text-center text-gray-500">
        <h1 className="text-2xl font-bold">주류 정보를 찾을 수 없습니다.</h1>
        <p>올바른 ID를 입력했는지 확인해주세요.</p>
      </div>
    );
  }

  return <DrinkDetail drink={drink} foodPairings={foodPairings} />;
};

export default DrinkDetailPage;
