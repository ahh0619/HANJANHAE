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
    <div className="mt-8">
      <p className="mb-2 text-gray-600">추천 검색어</p>
      <div className="flex gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className="rounded-full border px-4 py-1 text-sm"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecommendCategory;
