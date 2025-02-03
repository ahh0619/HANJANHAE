'use client';

import Link from 'next/link';

import OptimizedImage from '@/components/common/OptimizedImage';
import ProductCard from '@/components/common/ProductCard';
import { useMultipleDrinkLike } from '@/hooks/like/useMultipleDrinkLike';
import { ResultType } from '@/types/preferences';

type DrinkListProps = {
  drinks: ResultType[];
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
    <div className="mx-auto mb-[-108px] w-full max-w-7xl">
      {/* Back Button과 제목 */}
      <div className="mx-auto flex w-[374px] flex-col items-center sm:w-full xl:hidden">
        <Link
          href={'/'}
          className="mb-[36px] flex w-full justify-start sm:px-2"
        >
          <OptimizedImage
            src="/assets/icons/chevron-left.svg"
            alt="뒤로가기 아이콘"
            width={40}
            height={40}
            className="flex h-[44px] p-[8px]"
          />
        </Link>

        <div className="mb-[36px] flex w-full flex-col justify-start px-4 sm:px-6">
          <h1 className="mb-2 text-title-lm">{title}</h1>
          <p className="text-body-mm">
            오늘은 추천 전통주를 드셔보시는 건 어떤가요?
          </p>
        </div>
      </div>

      {/* 카드 리스트 */}
      <div className="mx-auto flex flex-col items-center px-4 sm:px-6 xl:h-[846px] xl:py-[50px]">
        <div className="grid grid-cols-1 gap-x-8 gap-y-[20px] sm:grid-cols-1 xl:grid-cols-2 xl:gap-y-[40px]">
          {drinks.map((drink) => {
            const isLiked = likeMap[drink.drink_id] || false;

            return (
              <Link
                href={`/drink/${drink.drink_id}`}
                key={drink.name}
                className="mx-auto flex h-[186px] w-full items-start gap-5 sm:w-[580px] xl:h-[222px]"
              >
                {/* 이미지 영역 */}
                <div className="flex-shrink-0">
                  <ProductCard
                    id={drink.drink_id}
                    name={drink.name}
                    imageUrl={drink.image}
                    isLiked={isLiked}
                    onToggleLike={() => handleToggleLike(drink.drink_id)}
                    scenario="result"
                    isNameVisible={false}
                  />
                </div>

                {/* 텍스트 영역 */}
                <div className="flex w-[190px] flex-col justify-start sm:w-[400px]">
                  {/* 주종 */}
                  <div className="flex text-grayscale-900">
                    <p className="w-[45px] text-title-sb xl:w-[60px] xl:text-title-mb">
                      주종
                    </p>
                    <p className="ml-[12px] w-[133px] text-body-sm sm:w-[329px] xl:text-body-mm">
                      {drink.type}
                    </p>
                  </div>

                  {/* 술 이름 */}
                  <div className="mt-[12px] flex text-grayscale-900">
                    <p className="w-[45px] text-title-sb xl:w-[60px] xl:text-title-mb">
                      술 이름
                    </p>
                    <p className="ml-[12px] w-[133px] text-body-sm sm:w-[329px] xl:text-body-mm">
                      {drink.name}
                    </p>
                  </div>

                  {/* 추천 이유 */}
                  <div className="mt-[12px] flex text-grayscale-900">
                    <p className="w-[45px] text-title-sb xl:w-[60px] xl:text-title-mb">
                      추천 이유
                    </p>
                    <p className="ml-[12px] w-[133px] text-body-sm sm:w-[329px] xl:text-body-mm">
                      {drink.reason}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DrinkList;
