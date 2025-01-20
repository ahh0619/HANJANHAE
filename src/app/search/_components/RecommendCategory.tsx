const RecommendCategory = ({
  setSearchValue,
}: {
  setSearchValue: (val: string) => void;
}) => {
  const categories = ['증류주', '모주', '막걸리'];
  const handleCategoryClick = (category: string) => {
    setSearchValue(category); // 검색어 상태 업데이트
  };

  return (
    <div className="mt-[60px]">
      <h2 className="font-title-lm mb-2 text-left text-grayscale-900">
        추천 검색어
      </h2>
      <div className="mt-[16px] flex gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className="rounded-[16px] border border-primary-200 bg-[#FFEAED] p-[8px] px-[16px] text-label-lm font-medium not-italic leading-[1.5] text-primary-200"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecommendCategory;
