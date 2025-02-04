import { Dispatch, SetStateAction } from 'react';

import { fetchUser } from '@/app/actions/auth';
import {
  addSurvey,
  fetchRecoData,
  fetchSurveyData,
  recommendDrinks,
} from '@/app/actions/preference';
import { Tables } from '@/types/supabase';

type fetchRecommendProps = {
  setDrinks: Dispatch<SetStateAction<Tables<'reco_results'>[] | null>>;
  setError: Dispatch<SetStateAction<string>>;
  setIsSurveyCompleted: (completed: boolean) => void;
  userId?: string | undefined;
};

export const fetchGuestRecommend = async ({
  setDrinks,
  setError,
  setIsSurveyCompleted,
}: fetchRecommendProps) => {
  const recoData = localStorage.getItem('recoData');

  if (recoData) {
    setDrinks(JSON.parse(recoData));
    return;
  }

  const surveyData = JSON.parse(localStorage.getItem('surveyData') || '{}');

  if (!surveyData || Object.keys(surveyData).length === 0) {
    console.log('설문조사 없음');
    setError('설문조사한 결과가 없습니다');
    return;
  }

  const updatedRecoData = await recommendDrinks({
    surveyData,
  });

  if (!updatedRecoData) {
    setError('AI 전통주 추천 실패!');
    return;
  }

  setDrinks(updatedRecoData);
  localStorage.setItem('recoData', JSON.stringify(updatedRecoData));
  setIsSurveyCompleted(true);
};

export const fetchAuthRecommend = async ({
  setDrinks,
  setError,
  setIsSurveyCompleted,
  userId,
}: fetchRecommendProps) => {
  // Step 1:전통주 추천리스트(슈퍼베이스 테이블 )
  const recoData = await fetchRecoData(userId);
  console.log('recoData: ', recoData);

  if (recoData.length > 0) {
    // Step 2-1:  2-1) 1번 데이터가 있으면 state에 넣어주고
    setDrinks(recoData);
    return;
  }

  // Step 2-2:  1번 데이터가 없으면, 설문조사 결과 가져오기
  const surveyData = await fetchSurveyData(userId);

  if (!surveyData) {
    console.log('설문조사 없음');
    setError('설문조사한 결과가 없습니다');
    return;
  }

  const updatedRecoData = await recommendDrinks({
    surveyData,
    userId,
  });

  if (!updatedRecoData) {
    setError('AI 전통주 추천 실패!');
    return;
  }

  setDrinks(updatedRecoData);
  setIsSurveyCompleted(true);
};

export const saveSurveyData = async (surveyData) => {
  try {
    const user = await fetchUser();
    // 로그인 유저 - 슈퍼베이스 테이블에 저장
    if (user) {
      await addSurvey({ surveyData, userId: user.id });
    }
    // 비로그인 유저 - 로컬스토리지 저장
    else {
      localStorage.setItem('surveyData', JSON.stringify(surveyData));
    }
  } catch (error) {
    console.error('Failed to save survey data:', error);
    throw new Error('설문조사 저장 실패!');
  }
};
