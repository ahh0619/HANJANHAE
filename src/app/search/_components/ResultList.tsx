'use client';

import { useRouter } from 'next/navigation';

import Modal from '@/components/common/Modal';
import ProductCard from '@/components/common/ProductCard';
import Toast from '@/components/common/Toast';
import { useMultipleLike } from '@/hooks/like/useMultipleLike';
import useFilterSortedResults from '@/hooks/search/useFilterSortedResults';
import { useIntersectionObserver } from '@/hooks/search/useInterSectionObserver';
import useFilterLikedResults from '@/hooks/search/useLikedResults';
import useSearchSortedResults from '@/hooks/search/useSearchSortedResults';
import useFilterStore from '@/store/filterStore';
import useFocusStore from '@/store/focusStore';

import Skeleton from './Skeleton';
import TotalAndSort from './TotalAndSort';

const ResultList = ({ user }) => {
  const router = useRouter();
  const userId = user?.id || '';
  const { isFiltered } = useFilterStore();
  const { isSearchFocus } = useFocusStore();
  const {
    SearchSortData,
    totalCount: searchSortTotal,
    isLoading: sortSearchIsLoading,
    isError: sortSearchIsError,
    fetchNextPage: fetchNextSearchSortPage,
    hasNextPage: hasNextSearchSortPage,
  } = useSearchSortedResults();

  const {
    filterSortData,
    totalCount: filterSortTotal,
    isLoading: sortFilterIsLoading,
    isError: sortFilterIsError,
    fetchNextPage: fetchNextFilterSortPage,
    hasNextPage: hasNextFilterSortPage,
  } = useFilterSortedResults();

  const {
    likedData,
    totalCount: likedTotal,
    isLoading: likeIsLoading,
    isError: likeIsError,
    fetchNextPage: fetchNextLikePage,
    hasNextPage: hasNextLikePage,
  } = useFilterLikedResults();

  const isSearchActive = SearchSortData?.length > 0;
  const isFilterActive = filterSortData?.length > 0;
  const isLikedActive = likedData?.length > 0;

  // 3개 중 우선순위대로 활성 데이터 선택
  const activeData = isSearchActive
    ? SearchSortData
    : isFilterActive
      ? filterSortData
      : isLikedActive
        ? likedData
        : [];

  // 활성 hasNextPage와 fetchNextPage도 동적으로 선택
  const activeHasNextPage = isSearchActive
    ? hasNextSearchSortPage
    : isFilterActive
      ? hasNextFilterSortPage
      : isLikedActive
        ? hasNextLikePage
        : false;

  const activeFetchNextPage = isSearchActive
    ? fetchNextSearchSortPage
    : isFilterActive
      ? fetchNextFilterSortPage
      : isLikedActive
        ? fetchNextLikePage
        : () => {};

  const observerRef = useIntersectionObserver({
    hasNextPage: activeHasNextPage && activeData.length > 0, // 데이터가 있을 때만 동작
    fetchNextPage: activeFetchNextPage,
  });

  const isLoading = sortSearchIsLoading || sortFilterIsLoading || likeIsLoading;

  const allDrinkIds = activeData.map((item) => item.id);
  const {
    isLoading: likeLoading,
    likeMap,
    toggleItem,
    isModalOpen,
    closeModal,
    toastMessage,
    closeToast,
  } = useMultipleLike(userId, allDrinkIds);

  const totalData = filterSortTotal || searchSortTotal || likedTotal;
  return (
    <>
      {/* 로딩 중일 때 Skeleton 표시 */}
      {isLoading && <Skeleton />}
      {!isLoading && activeData.length === 0 && (
        <div className="mt-8 text-center text-gray-500">
          검색 결과가 존재하지 않습니다.
        </div>
      )}

      {activeData.length > 0 && <TotalAndSort totalData={totalData} />}
      <div className="mx-[56px] my-0 grid w-full max-w-[448px] grid-cols-2 justify-items-center gap-[8px]">
        {activeData.length > 0 &&
          activeData.map((result) => {
            const isLiked = likeMap[result.id] || false;
            return (
              <ProductCard
                key={result.id}
                id={result.id}
                name={result.name}
                imageUrl={result.image}
                isLiked={isLiked}
                onToggleLike={() => toggleItem(result.id)}
                width={'100%'}
                height={'241px'}
                marginBottom={'20px'}
                imgHeight={'207px'}
              />
            );
          })}

        {/* 무한 스크롤 감지용 */}
        <div ref={observerRef} style={{ height: '1px' }} />

        {/* 모달 */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="좋아요를 하시겠어요?"
          content={`좋아요 기능을 사용하려면\n로그인을 해야 해요.`}
          secondaryAction={{ text: '돌아가기', onClick: closeModal }}
          primaryAction={{
            text: '로그인하기',
            onClick: () => {
              router.push('/signin');
              closeModal();
            },
          }}
        />

        {/* 토스트 */}
        {toastMessage && <Toast message={toastMessage} onClose={closeToast} />}
      </div>
    </>
  );
};

export default ResultList;
