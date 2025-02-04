'use client';

import Link from 'next/link';

import { transformCloudinaryUrl } from '@/utils/common/transformCloudinaryUrl';

import LikeButton from './LikeButton';
import OptimizedImage from './OptimizedImage';

type ProductCardScenario = 'default' | 'result' | 'search' | 'like';

type ProductCardProps = {
  id: string;
  name: string;
  imageUrl: string;
  isLiked: boolean;
  onToggleLike: () => void;
  scenario?: ProductCardScenario;
  isNameVisible?: boolean;
  ispriority?: boolean;
};

const scenarioToClass = (scenario: ProductCardScenario) => {
  switch (scenario) {
    case 'default':
      return {
        container: 'product-card-default',
        image: 'product-card-default-image',
        likeBtn: 'product-card-default-likeBtn',
      };
    case 'result':
      return {
        container: 'product-card-result',
        image: 'product-card-result-image',
        likeBtn: 'product-card-result-likeBtn',
      };
    case 'search':
      return {
        container: 'product-card-search',
        image: 'product-card-search-image',
        likeBtn: 'product-card-search-likeBtn',
      };
    case 'like':
      return {
        container: 'product-card-like',
        image: 'product-card-like-image',
        likeBtn: 'product-card-like-likeBtn',
      };
    default:
      return {
        container: 'product-card-default',
        image: 'product-card-default-image',
        likeBtn: 'product-card-default-likeBtn',
      };
  }
};

const ProductCard = ({
  id,
  name,
  imageUrl,
  isLiked,
  onToggleLike,
  scenario = 'default',
  isNameVisible = true,
  ispriority = false,
}: ProductCardProps) => {
  const classes = scenarioToClass(scenario);
  const optimizedUrl = transformCloudinaryUrl(imageUrl);

  return (
    <div className={classes.container}>
      {/* 좋아요 버튼 */}
      <div className={classes.likeBtn}>
        <LikeButton isLiked={isLiked} onClick={onToggleLike} />
      </div>

      {/* 상세 페이지 링크 */}
      <Link href={`/drink/${id}`} className="flex flex-col">
        {/* 이미지 영역 */}
        <div className={classes.image}>
          {/* fill 모드 */}
          <OptimizedImage
            src={optimizedUrl}
            alt={name}
            fill
            priority={ispriority}
          />
        </div>

        {/* 이름 */}
        {isNameVisible && (
          <div className="mt-3 w-full overflow-hidden text-ellipsis whitespace-nowrap text-left text-title-mm xl:mt-5">
            {name}
          </div>
        )}
      </Link>
    </div>
  );
};

export default ProductCard;
