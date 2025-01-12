'use server';

import OpenAI from 'openai';

import { Tables } from '@/types/supabase';
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
  surveyData: Partial<Tables<'survey'>>;
  userId?: string;
}): Promise<Tables<'reco_results'>[] | null> => {
  console.log('action surveydata: ', surveyData);

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
    const jsonData = JSON.parse(data);

    console.log('reccommend: ', jsonData);

    // 여기서 슈퍼베이스 reco_results 테이블에 레코드 삽입
    if (userId) {
    }

    return jsonData;
  } else {
    return null;
  }
};

export const hasRecoResult = async (
  userId: string,
): Promise<Tables<'reco_results'>[] | null> => {
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
  surveyData: Partial<Tables<'survey'>>;
  userId: string;
}): Promise<void> => {
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
  recoData: any;
  userId: string;
}) => {};

export const fetchSurveyData = async (
  userId: string,
): Promise<Tables<'survey'> | null> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('survey')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    throw new Error(`설문조사 가져오기에 실패했습니다: ${error!.message}`);
  }

  return data;
};

export const fetchRecoData = async (
  userId: string,
): Promise<Tables<'reco_results'>[] | null> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('reco_results')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    throw new Error(`취향조사 가져오기에 실패했습니다: ${error!.message}`);
  }

  return data;
};
