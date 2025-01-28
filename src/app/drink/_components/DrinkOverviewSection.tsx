import { fetchDrinks } from '@/app/actions/drink';

import DrinkDescription from './DrinkDescription';
import DrinkImage from './DrinkImage';
import DynamicHeader from './DynamicHeader';

const DrinkOverviewSection = async ({ drinkId }: { drinkId: string }) => {
  const drink = await fetchDrinks(drinkId);

  return (
    <>
      <div className="block xl:hidden">
        <DynamicHeader
          name={drink.name}
          image={drink.image!}
          description={drink.description!}
          drinkId={drink.id}
        />
      </div>

      <div className="mx-auto">
        <DrinkImage image={drink.image} name={drink.name} />
        <DrinkDescription
          name={drink.name}
          imageUrl={drink.image!}
          description={drink.description}
          drinkId={drink.id}
        />
      </div>
    </>
  );
};

export default DrinkOverviewSection;
