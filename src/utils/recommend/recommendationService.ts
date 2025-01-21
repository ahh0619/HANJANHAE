import {
  recommendByFood,
  recommendByMood,
  recommendBySeason,
} from '@/app/actions/recommend';

const getCurrentSeason = (): string => {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return '봄';
  if (month >= 6 && month <= 8) return '여름';
  if (month >= 9 && month <= 11) return '가을';
  return '겨울';
};

const randomFoodCategory = (): string => {
  const foodCategories = [
    '스테이크',
    '디저트류',
    '육회',
    '튀김류',
    '삼겹살',
    '두부김치',
    '골뱅이무침',
    '김치전',
    '부추전',
    '족발',
    '해물찜',
    '감자전',
    '생선회',
    '파전',
    '견과류',
    '해물파전',
    '어묵탕',
    '보쌈',
    '계란말이',
    '치즈',
    '오돌뼈',
    '과일',
    '김치찌개',
    '치킨',
    '닭발',
    '갈비찜',
    '된장찌개',
  ];
  return foodCategories[Math.floor(Math.random() * foodCategories.length)];
};

const randomMood = (): string =>
  Math.random() > 0.5 ? '기분이 좋을 때' : '우울할 때';

let fixedFoodCategory = randomFoodCategory();
let fixedMood = randomMood();

export const getRecommendations = async () => {
  const season = getCurrentSeason();
  const foodCategory = fixedFoodCategory;
  const mood = fixedMood;

  try {
    const [seasonRecommendations, foodRecommendations, moodRecommendations] =
      await Promise.all([
        recommendBySeason(season),
        recommendByFood(foodCategory),
        recommendByMood(mood),
      ]);

    return {
      season,
      foodCategory,
      mood,
      seasonRecommendations,
      foodRecommendations,
      moodRecommendations,
    };
  } catch (error) {
    console.error('추천 데이터를 가져오는 중 오류 발생:', error);

    return {
      season,
      foodCategory,
      mood,
      seasonRecommendations: [],
      foodRecommendations: [],
      moodRecommendations: [],
    };
  }
};
