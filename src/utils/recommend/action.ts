'use server';

import { OpenAI } from 'openai';

import { fetchDrinksByNames, fetchRandomDrinks } from '@/utils/drink/action';

const openai = new OpenAI({
  organization: process.env.ORGANIZATION_ID,
  apiKey: process.env.CHATGPT_API_KEY,
  project: process.env.PROJECT_ID,
});

type DrinkRecommendation = { name: string };

function extractJsonChunk(input: string): string {
  let text = input.replace(/```(?:json)?|```/g, '').trim();
  const match = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);

  if (match) {
    return match[0].trim();
  }

  return text;
}

function parseRecommendations(raw: string): DrinkRecommendation[] {
  const maybeJson = extractJsonChunk(raw);

  let parsed: unknown;
  try {
    parsed = JSON.parse(maybeJson);
  } catch (err) {
    throw new Error('JSON 파싱 실패');
  }

  // 이미 [{ name: string }] 형식이면 그냥 반환
  if (
    Array.isArray(parsed) &&
    parsed.every((item) => typeof item?.name === 'string')
  ) {
    return parsed as DrinkRecommendation[];
  }

  // 객체 안에 어떤 "키"라도, 그 값이 string[] 라면 그걸 사용
  if (parsed && typeof parsed === 'object') {
    for (const [key, value] of Object.entries(parsed)) {
      if (Array.isArray(value) && value.every((v) => typeof v === 'string')) {
        return value.map((name: string) => ({ name }));
      }
    }
  }

  throw new Error('데이터 형식 오류');
}

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

      try {
        const jsonData: DrinkRecommendation[] = parseRecommendations(rawData);
        const namesArray = jsonData.map((item) => item.name);
        const drinks = await fetchDrinksByNames(namesArray);

        return drinks;
      } catch (error) {
        console.error('추천 데이터 파싱 실패:', error);
        return await fetchRandomDrinks(5);
      }
    } else {
      console.error('OpenAI 실행 실패:', run);
      return await fetchRandomDrinks(5);
    }
  } catch (error) {
    console.error('fetchRecommendedDrinks 함수 에러:', error);
    return await fetchRandomDrinks(5);
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
