const RecommendCategory = () => {
  const titleCategory = ['증류주', '막걸리', '전통주'];

  return (
    <div className="mt-8">
      <p className="mb-2 text-gray-600">추천 검색어</p>
      <div className="flex gap-2">
        {titleCategory.map((word, index) => (
          <button key={index} className="rounded-full border px-4 py-1 text-sm">
            {word}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecommendCategory;
