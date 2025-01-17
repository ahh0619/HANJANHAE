'use server';

import { OpenAI } from 'openai';

import { fetchDrinksByNames } from '@/utils/drink/action';

const openai = new OpenAI({
  organization: process.env.ORGANIZATION_ID,
  apiKey: process.env.CHATGPT_API_KEY,
  project: process.env.PROJECT_ID,
});

type DrinkRecommendation = { name: string };

const fetchRecommendedDrinks = async (content: string, assistantId: string) => {
  try {
    const thread = await openai.beta.threads.create();
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content,
    });

    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: assistantId,
    });

    if (run.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(run.thread_id);
      const rawData = (
        messages.data[0].content[0] as { text: { value: string } }
      ).text.value;

      const cleanedData = rawData.replace(/```json|```/g, '').trim();

      let jsonData: DrinkRecommendation[];

      try {
        jsonData = JSON.parse(cleanedData);

        if (!Array.isArray(jsonData)) {
          throw new Error('데이터 형식 오류: 배열이 아닙니다.');
        }
        if (!jsonData.every((item) => typeof item.name === 'string')) {
          throw new Error('데이터 형식 오류: name 속성이 없습니다.');
        }
      } catch (error) {
        console.error('JSON 파싱 실패:', error);
        throw new Error('데이터 형식이 올바르지 않습니다.');
      }

      const namesArray = jsonData.map((item) => item.name);

      const drinks = await fetchDrinksByNames(namesArray);
      return drinks;
    } else {
      console.error('OpenAI 실행 실패:', run);
      return [];
    }
  } catch (error) {
    console.error('fetchRecommendedDrinks 함수 에러:', error);
    throw error;
  }
};

export const recommendByFood = async (foodCategory: string) => {
  const content = `${foodCategory}에 어울리는 전통주를 추천해주세요.`;
  return await fetchRecommendedDrinks(content, process.env.FOOD_ASSISTANT_ID!);
};

export const recommendByMood = async (mood: string) => {
  const content = `${mood}에 어울리는 전통주를 추천해주세요.`;
  return await fetchRecommendedDrinks(content, process.env.MOOD_ASSISTANT_ID!);
};

export const recommendBySeason = async (season: string) => {
  const content = `${season}에 어울리는 전통주를 추천해주세요.`;
  return await fetchRecommendedDrinks(
    content,
    process.env.SEASON_ASSISTANT_ID!,
  );
};
