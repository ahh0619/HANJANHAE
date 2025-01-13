import useDrinkRecommendations from '@/hooks/result/useDrinkRecommendations';

type DrinkAuthRecoProps = {
  userId: string;
};

const DrinkAuthReco = ({ userId }: DrinkAuthRecoProps) => {
  const drinks = useDrinkRecommendations(userId);

  if (drinks === null) {
    return <div>Loading...</div>;
  }

  if (drinks.length === 0) {
    return <div>추천 결과 없음</div>;
  }

  return (
    <div>
      {drinks.map((drink) => (
        <div key={drink.id} className="mb-8">
          <h1>{drink.name}</h1>
          <p>{drink.type}</p>
          <span>{drink.reason}</span>
        </div>
      ))}
    </div>
  );
};

export default DrinkAuthReco;
