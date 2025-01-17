import Link from 'next/link';
import React from 'react';

import LikeButton from './LikeButton';

type ProductCardProps = {
  id: string;
  name: string;
  imageUrl: string;
  userId: string | null;
  width?: string;
  height?: string;
  marginBottom?: string;
  imgHeight?: string | number;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  imageUrl,
  userId,
  width = '124px',
  height = '186px',
  marginBottom = '0px',
  imgHeight = '152px',
}) => {
  return (
    <div
      className="relative flex flex-col"
      style={{
        width,
        height,
        marginBottom,
      }}
    >
      {/* 좋아요 버튼 */}
      <div className="absolute bottom-[30px] right-0 z-10">
        <LikeButton drinkId={id} userId={userId} />
      </div>

      <Link
        href={`/drink/${encodeURIComponent(name)}`}
        className="flex flex-col"
      >
        {/* 이미지 */}
        <div
          className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-grayscale-200 bg-gray-100 bg-opacity-50"
          style={{ height: imgHeight }}
        >
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full rounded-lg object-contain"
          />
        </div>
        {/* 이름 */}
        <div className="mt-3 w-full overflow-hidden text-ellipsis whitespace-nowrap text-left text-title-mm">
          {name}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
