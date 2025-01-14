'use server';

import { OpenAI } from 'openai';

import { fetchDrinksByNames } from '@/utils/drink/action';

const openai = new OpenAI({
  organization: process.env.ORGANIZATION_ID,
  apiKey: process.env.CHATGPT_API_KEY,
  project: process.env.PROJECT_ID,
});

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
      const jsonData = (
        messages.data[0].content[0] as { text: { value: string } }
      ).text.value;

      // 추천 결과를 JSON으로 파싱하여 이름 배열 생성
      const namesArray = JSON.parse(jsonData).map(
        (item: { name: string }) => item.name,
      );

      // Supabase에서 이름 배열로 데이터를 가져오기
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

export const recommendTraditionalLiquor = async (foodCategory: string) => {
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
