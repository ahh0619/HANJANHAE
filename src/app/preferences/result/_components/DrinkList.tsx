'use client';

import Link from 'next/link';

import ProductCard from '@/components/common/ProductCard';
import { useMultipleDrinkLike } from '@/hooks/like/useMultipleDrinkLike';
import { Tables } from '@/types/supabase';

type DrinkListProps = {
  drinks: Tables<'reco_results'>[];
  title: string;
  userId: string | null;
};

const DrinkList = ({ drinks, title, userId }: DrinkListProps) => {
  const allDrinkIds = drinks.map((d) => d.drink_id);

  const { isLoading, likeMap, handleToggleLike } = useMultipleDrinkLike({
    userId: userId || '',
    drinkIds: allDrinkIds,
  });

  return (
    <div className="mx-auto flex w-full max-w-md flex-col">
      <Link href={'/'} className="flex w-full justify-center">
        <div className="flex h-[44px] w-[367px] items-center">
          <img
            src="/assets/icons/chevron-left.svg"
            alt="뒤로가기 아이콘"
            width="40px"
            height="40px"
            className="p-[8px]"
          />
        </div>
      </Link>

      <div className="mx-auto">
        <div className="my-[36px]">
          <h1 className="mb-2 text-title-lm">{title}</h1>
          <p className="text-body-mm">
            오늘은 추천 전통주를 드셔보시는 건 어떤가요?
          </p>
        </div>
        {drinks.map((drink) => {
          const isLiked = likeMap[drink.drink_id] || false;
          return (
            <div key={drink.name} className="mb-[20px] flex h-[190px]">
              <ProductCard
                id={drink.drink_id}
                name={drink.name}
                imageUrl={drink.image}
                isLiked={isLiked}
                onToggleLike={() => handleToggleLike(drink.drink_id)}
                scenario="result"
                isNameVisible={false}
              />

              <div className="ml-[20px]">
                {/* 주종 */}
                <div className="flex text-grayscale-900">
                  <p className="w-[45px] text-title-sb">주종</p>
                  <p className="] ml-[12px] w-[133px] text-body-sm">
                    {drink.type}
                  </p>
                </div>

                {/* 술 이름 */}
                <div className="mt-[12px] flex text-grayscale-900">
                  <span className="w-[45px] text-title-sb">술 이름</span>
                  <span className="ml-[12px] w-[133px] text-body-sm">
                    {drink.name}
                  </span>
                </div>

                {/* 추천 이유 */}
                <div className="mt-[12px] flex text-grayscale-900">
                  <p className="w-[45px] text-title-sb">추천 이유</p>
                  <p className="ml-[12px] w-[133px] text-body-sm">
                    {drink.reason}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DrinkList;
