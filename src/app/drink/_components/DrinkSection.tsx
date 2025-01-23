import { fetchDrinks } from '@/app/actions/drink';

import DrinkBasicInfo from './DrinkBasicInfo';
import DrinkDescription from './DrinkDescription';
import DrinkImage from './DrinkImage';
import DrinkTasteProfile from './DrinkTasteProfile';
import DynamicHeader from './DynamicHeader';

const DrinkSection = async ({ drinkId }: { drinkId: string }) => {
  const drink = await fetchDrinks(drinkId);
  return (
    <>
      <DynamicHeader
        name={drink.name}
        image={drink.image!}
        description={drink.description!}
        drinkId={drink.id}
      />

      <div className="mx-auto">
        <DrinkImage image={drink.image} name={drink.name} />
        <DrinkDescription
          name={drink.name}
          imageUrl={drink.image!}
          description={drink.description}
          drinkId={drink.id}
        />
        <DrinkBasicInfo drink={drink} />

        {/* Taste Profile */}
        <DrinkTasteProfile drink={drink} />
      </div>
    </>
  );
};

export default DrinkSection;
