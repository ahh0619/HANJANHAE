type FoodPairingProps = {
  pairings: { food_name: string; food_image: string | null }[];
};

const FoodPairing = ({ pairings }: FoodPairingProps) => {
  return (
    <section className="mx-auto w-full">
      <h3 className="text-title-lm text-grayscale-900">추천 페어링 음식</h3>
      <div className="mt-4 grid grid-cols-3 justify-items-center gap-8">
        {pairings.map((food, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            {/* 음식 이미지 */}
            <div className="flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-full bg-grayscale-300">
              {food.food_image ? (
                <img
                  src={food.food_image}
                  alt={food.food_name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm font-semibold text-gray-500">
                  이미지 없음
                </span>
              )}
            </div>
            {/* 음식 이름 */}
            <p className="mb-8 mt-2 text-center text-body-mm text-grayscale-900">
              {food.food_name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FoodPairing;
