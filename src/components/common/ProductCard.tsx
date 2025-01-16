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
    <div className="relative flex w-32 flex-col">
      {/* 좋아요 버튼 */}
      <div className="absolute bottom-6 right-0 z-10">
        <LikeButton drinkId={id} userId={userId} />
      </div>

      <Link
        href={`/drink/${encodeURIComponent(name)}`}
        className="flex flex-col"
      >
        {/* 이미지 */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-gray-100 bg-opacity-50">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full rounded-lg object-contain"
          />
        </div>
        {/* 이름 */}
        <div className="mt-2 w-full overflow-hidden text-ellipsis whitespace-nowrap text-left text-xs">
          {name}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
