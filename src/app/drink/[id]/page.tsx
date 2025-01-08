import DrinkDetail from '@/app/drink/_components/DrinkDetail';
import { fetchDrinks } from '@/utils/drink/action';

type DrinkDetailPageProps = {
  params: { id: string };
};

const DrinkDetailPage = async ({ params }: DrinkDetailPageProps) => {
  const drinkUrlName = decodeURIComponent(params.id);
  const drink = await fetchDrinks(drinkUrlName);

  if (!drink) {
    return (
      <div className="mx-auto max-w-md p-4 text-center text-gray-500">
        <h1 className="text-2xl font-bold">주류 정보를 찾을 수 없습니다.</h1>
        <p>올바른 ID를 입력했는지 확인해주세요.</p>
      </div>
    );
  }

  return <DrinkDetail drink={drink} />;
};

export default DrinkDetailPage;
