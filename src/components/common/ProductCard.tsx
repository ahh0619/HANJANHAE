import Link from 'next/link';
import React from 'react';

import LikeButton from './LikeButton';

type ProductCardProps = {
  id: string;
  name: string;
  imageUrl: string;
  userId: string | null;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  imageUrl,
  userId,
}) => {
  return (
    <div className="relative flex w-48 flex-col rounded-lg border p-2">
      {/* 좋아요 버튼 */}
      <div className="absolute right-0 top-1 z-10">
        <LikeButton drinkId={id} userId={userId} />
      </div>
      {/* 이미지와 이름에 링크 추가 */}
      <Link
        href={`/drink/${encodeURIComponent(name)}`}
        className="flex flex-col"
      >
        {/* 이미지 */}
        <div className="aspect-[4/5] w-full overflow-hidden bg-gray-100 bg-opacity-50">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-contain"
          />
        </div>
        {/* 이름 */}
        <div className="mt-2 w-full text-left text-xs">{name}</div>
      </Link>
    </div>
  );
};

export default ProductCard;
