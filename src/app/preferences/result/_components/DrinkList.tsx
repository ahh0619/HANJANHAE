import Link from 'next/link';

import { Tables } from '@/types/supabase';

type DrinkListProps = {
  drinks: Tables<'reco_results'>[];
  title: string;
};

const DrinkList = ({ drinks, title }: DrinkListProps) => {
  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-2 text-xl font-bold">{title}</h1>
      <p className="mb-3 text-gray-600">
        오늘은 추천 전통주를 드셔보시는 건 어떤가요?
      </p>
      <div className="space-y-6">
        {drinks.map((drink) => {
          const drinkUrlName = decodeURIComponent(drink.name);

          return (
            <Link href={`drink/${drinkUrlName}`} key={drink.id}>
              <div className="flex items-start border-b border-gray-200 py-6">
                {/* 음료 이미지 */}
                <div className="h-30 w-24 flex-shrink-0">
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="h-full w-full rounded-md object-cover"
                  />
                </div>
                {/* 음료 정보 */}
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">{drink.name}</h2>
                  <p className="text-gray-600">{drink.type}</p>
                  <p className="mt-2 text-sm text-gray-800">{drink.reason}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DrinkList;
