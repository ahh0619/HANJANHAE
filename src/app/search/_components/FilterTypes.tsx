// import AlcholeStrength from './AlcholStrength';
import AlcholeStrength from './AlcholStrength';
import AlcholeTaste from './AlcholTaste';
import AlcholType from './AlcholType';

const FilterType = () => {
  const categories = ['단맛', '신맛', '청량감', '바디감'];
  return (
    <div className="flex-1 p-4">
      {/* 술 종류 */}
      <AlcholType />

      {/* 도수로 찾기 */}
      <AlcholeStrength />

      {/* 맛 관련 슬라이더 */}
      {categories.map((category) => (
        <AlcholeTaste key={category} category={category} />
      ))}
    </div>
  );
};

export default FilterType;
