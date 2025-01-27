import { fetchDrinks } from '@/app/actions/drink';

import DrinkBasicInfo from './DrinkBasicInfo';
import DrinkTasteProfile from './DrinkTasteProfile';

const DrinkInfoAndTasteProfile = async ({ drinkId }: { drinkId: string }) => {
  const drink = await fetchDrinks(drinkId);
  if (!drink) return null;

  return (
    <section>
      {/* 기본 정보 */}
      <DrinkBasicInfo drink={drink} />

      {/* 맛 프로필 */}
      <DrinkTasteProfile drink={drink} />
    </section>
  );
};

export default DrinkInfoAndTasteProfile;
