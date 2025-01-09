type FoodPairingProps = {
  pairings: { food_name: string; food_image: string | null }[];
};

const FoodPairing = ({ pairings }: FoodPairingProps) => {
  return (
    <section className="border-b p-4">
      <h3 className="text-lg font-bold">추천 페어링 음식</h3>
      <div className="mt-4 grid grid-cols-3 justify-items-center gap-6">
        {pairings.map((food, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center space-y-2"
          >
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-300">
              {food.food_image ? (
                <img
                  src={food.food_image}
                  alt={food.food_name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm text-gray-500">이미지 없음</span>
              )}
            </div>
            <p className="text-center text-sm text-gray-700">
              {food.food_name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FoodPairing;
