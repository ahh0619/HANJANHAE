'use client';

import Link from 'next/link';
import React from 'react';

import LikeButton from './LikeButton';
import OptimizedImage from './OptimizedImage';

type ProductCardProps = {
  id: string;
  name: string;
  imageUrl: string;
  isLiked: boolean;
  onToggleLike: () => void;
  width?: string;
  height?: string;
  marginBottom?: string;
  imgHeight?: string | number;
  isNameVisible?: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  imageUrl,
  isLiked,
  onToggleLike,
  width = '124px',
  height = '186px',
  marginBottom = '0px',
  imgHeight = '152px',
  isNameVisible = true,
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
      <div className="absolute bottom-[34px] right-0 z-10">
        <LikeButton isLiked={isLiked} onClick={onToggleLike} />
      </div>

      {/* 상세 페이지 링크 */}
      <Link href={`/drink/${id}`} className="flex flex-col">
        {/* 이미지 */}
        <div
          className="relative aspect-[4/5] w-full overflow-hidden rounded-[8px] border border-grayscale-200 bg-gray-100 bg-opacity-50"
          style={{ height: imgHeight }}
        >
          <OptimizedImage
            src={imageUrl}
            alt={name}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        {/* 이름 */}
        {isNameVisible && (
          <div className="mt-3 w-full overflow-hidden text-ellipsis whitespace-nowrap text-left text-title-mm">
            {name}
          </div>
        )}
      </Link>
    </div>
  );
};

export default ProductCard;
