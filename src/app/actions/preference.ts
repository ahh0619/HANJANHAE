'use server';

import OpenAI from 'openai';

import { ResultType, SurveyType } from '@/types/preferences';
import { createClient } from '@/utils/supabase/server';

const openai = new OpenAI({
  organization: process.env.ORGANIZATION_ID,
  project: process.env.PROJECT_ID,
  apiKey: process.env.CHATGPT_API_KEY,
});

export const recommendDrinks = async ({
  surveyData,
  userId,
}: {
  surveyData: Partial<SurveyType>;
  userId?: string;
}): Promise<ResultType[] | null> => {
  const content = `
    1. 어떤 종류의 술을 선호하시나요? 답변: ${surveyData.type}
    2. 어느 정도 도수의 술을 선호하시나요? 답변: ${surveyData.level}
    3. 단맛의 선호도는 어느 정도인가요? 답변: ${surveyData.sweetness}
    4. 신맛의 선호도는 어느 정도인가요? 답변: ${surveyData.acidity}
    5. 청량감의 선호도는 어느 정도인가요? 답변: ${surveyData.carbonation}
    6. 무게감(바디감)의 선호도는 어느 정도인가요? 답변: ${surveyData.body}
    7. 선호하는 안주는 무엇인가요? 답변: ${surveyData.food}
  `;

  const thread = await openai.beta.threads.create();

  const message = await openai.beta.threads.messages.create(thread.id, {
    role: 'user',
    content,
  });

  const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: process.env.ASSISTANT_ID!,
  });

  if (run.status === 'completed') {
    const messages = await openai.beta.threads.messages.list(run.thread_id);
    const data = (messages.data[0].content[0] as { text: { value: string } })
      .text.value;

    const replaceddata = data.replace(/```json|```/g, '').trim(); // 1. 백틱과 ```json 제거

    const jsonData = JSON.parse(replaceddata);
    console.log('ai jsonData: ', jsonData);

    // drinks 데이터 확인 및 최종 결과 생성
    const finalResults = await fetchDrinksWithReason(jsonData);

    console.log('Final Results:', finalResults);

    if (userId) {
      await addRecoResult({ recoData: finalResults, userId });
    }

    return finalResults;
  } else {
    return null;
  }
};

export const hasRecoResult = async (
  userId: string,
): Promise<ResultType[] | null> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('reco_results')
    .select('*')
    .eq('user_id', userId)
    .limit(1);

  if (error) {
    console.error('전통주 추천 결과 확인중 에러 발생:', error);
    return null;
  }

  if (data && data.length > 0) {
    return data;
  } else {
    return null;
  }
};

export const addSurvey = async ({
  surveyData,
  userId,
}: {
  surveyData: Partial<SurveyType>;
  userId: string;
}) => {
  const supabase = await createClient();

  const { error } = await supabase.from('survey').insert({
    type: surveyData.type,
    level: surveyData.level,
    sweetness: surveyData.sweetness,
    acidity: surveyData.acidity,
    carbonation: surveyData.carbonation,
    body: surveyData.body,
    food: surveyData.food,
    user_id: userId,
  });

  if (error) {
    throw new Error(`취향조사 추가에 실패했습니다: ${error!.message}`);
  }
};

export const addRecoResult = async ({
  recoData,
  userId,
}: {
  recoData: ResultType[];
  userId: string;
}) => {
  const supabase = await createClient();

  const insertData = recoData.map((item) => ({
    type: item.type,
    name: item.name,
    reason: item.reason,
    user_id: userId,
    image: item.image,
    drink_id: item.drink_id,
  }));

  console.log('insertdata: ', insertData);
  const { error } = await supabase.from('reco_results').insert(insertData);

  if (error) {
    throw new Error(`전통주 추천 결과 추가에 실패했습니다: ${error!.message}`);
  }
};

export const updateSurvey = async ({
  surveyData,
  userId,
}: {
  surveyData: Partial<SurveyType>;
  userId: string;
}) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from('survey')
    .update(surveyData)
    .eq('user_id', userId);

  if (error) {
    throw new Error(`설문조사 갱신에 실패했습니다: ${error!.message}`);
  }

  await deleteRecoResult(userId);
};

export const deleteRecoResult = async (userId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('reco_results')
    .delete()
    .eq('user_id', userId)
    .select();

  if (error) {
    throw new Error(`전통주 추천결과 삭제에 실패했습니다: ${error!.message}`);
  }
};

export const fetchDrinksWithReason = async (
  jsonData: { name: string; reason: string }[],
): Promise<ResultType[]> => {
  const supabase = await createClient();
  const results: ResultType[] = [];

  for (const item of jsonData) {
    const { name, reason } = item;

    const { data: drinkData, error } = await supabase
      .from('drinks')
      .select('*')
      .eq('name', name)
      .single();

    if (error) {
      console.error(`Supabase error for name "${name}":`, error);
      continue; // 에러 발생 시 스킵
    }

    console.log('drinkdata: ', drinkData);

    if (drinkData) {
      const { id, ...rest } = drinkData;
      results.push({
        ...rest,
        drink_id: id,
        reason,
      });
    }
  }

  return results;
};

export const fetchSurveyData = async (
  userId: string,
): Promise<SurveyType | null> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('survey')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    return null;
  }

  return data;
};

export const fetchRecoData = async (
  userId: string,
): Promise<ResultType[] | null> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('reco_results')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    throw new Error(
      `전통주 추천 결과 가져오기에 실패했습니다: ${error!.message}`,
    );
  }

  return data;
};

export const hasSurveyRecord = async (userId: string): Promise<boolean> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('survey')
    .select('id')
    .eq('user_id', userId)
    .limit(1);

  if (error) {
    console.error('Error fetching survey record:', error);
    return false;
  }

  return data.length > 0;
};
