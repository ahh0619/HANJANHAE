import { NextResponse } from 'next/server';
import OpenAI from 'openai';

import {
  addRecoResult,
  fetchDrinksWithReason,
} from '@/utils/preference/action';

const openai = new OpenAI({
  organization: process.env.ORGANIZATION_ID,
  project: process.env.PROJECT_ID,
  apiKey: process.env.CHATGPT_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { surveyData, userId } = await req.json();

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

    if (run.status !== 'completed') {
      return NextResponse.json({ error: 'AI 추천 생성 실패' }, { status: 500 });
    }

    const messages = await openai.beta.threads.messages.list(run.thread_id);
    const data = (messages.data[0].content[0] as { text: { value: string } })
      .text.value;

    const replaceddata = data.replace(/```json|```/g, '').trim();
    const jsonData = JSON.parse(replaceddata);

    const finalResults = await fetchDrinksWithReason(jsonData);

    if (userId) {
      await addRecoResult({ recoData: finalResults, userId });
    }

    return NextResponse.json(finalResults);
  } catch (error) {
    console.error('추천 생성 실패:', error);
    return NextResponse.json(
      { error: '추천 생성 중 오류 발생' },
      { status: 500 },
    );
  }
}
