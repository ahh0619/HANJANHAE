'use server';

import OpenAI from 'openai';

import { Tables } from '@/types/supabase';
import { surveyProps } from '@/types/surveyTypes';
import { createClient } from '@/utils/supabase/server';

const openai = new OpenAI({
  organization: process.env.ORGANIZATION_ID,
  project: process.env.PROJECT_ID,
  apiKey: process.env.CHATGPT_API_KEY,
});

export const recommendDrinks = async ({
  surveyData,
}: {
  surveyData: surveyProps;
}): Promise<Tables<'reco_results'>[] | null> => {
  console.log('action surveydata: ', surveyData);

  const content = `
    1. 어떤 종류의 술을 선호하시나요? 답변: ${surveyData.type.join(', ')}
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

export const insertSurvey = async ({
  surveyData,
  userId,
}: {
  surveyData: surveyProps;
  userId: string;
}): Promise<void> => {
  const supabase = await createClient();

  const { error } = await supabase.from('survey').insert({
    type: surveyData.type.join(', '),
    level: surveyData.level,
    sweetness: surveyData.sweetness,
    acidity: surveyData.acidity,
    carbonation: surveyData.carbonation,
    body: surveyData.body,
    food: surveyData.food,
  });

  if (error) {
    throw new Error(`취향조사 추가에 실패했습니다: ${error!.message}`);
  }
};
