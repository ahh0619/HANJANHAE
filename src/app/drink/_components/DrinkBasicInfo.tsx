import { Database } from '@/types/supabase';

type Drink = Database['public']['Tables']['drinks']['Row'];

const DrinkBasicInfo = ({ drink }: { drink: Drink }) => (
  <section className="border-b p-4">
    <h3 className="text-lg font-bold">기본 정보</h3>
    <div className="mt-1">
      <p className="mt-1 text-sm text-gray-500">
        {drink.ingredients || '재료 정보 없음'}
      </p>
      <div className="mt-2 space-y-2 text-sm">
        <div className="flex justify-between">
          <p className="font-semibold">주종</p>
          <p className="text-gray-700">{drink.type || '정보 없음'}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">도수</p>
          <p className="text-gray-700">
            {drink.alcohol_content || '정보 없음'}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">용량</p>
          <p className="text-gray-700">{drink.volume || '정보 없음'}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">제조사</p>
          <p className="text-gray-700">{drink.manufacturer || '정보 없음'}</p>
        </div>
      </div>
    </div>
  </section>
);

export default DrinkBasicInfo;
