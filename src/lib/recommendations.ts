import { Dispatch, SetStateAction } from 'react';

import { fetchUser } from '@/app/actions/auth';
import {
  addSurvey,
  fetchRecoData,
  fetchSurveyData,
  recommendDrinks,
} from '@/app/actions/preference';
import { ResultType } from '@/types/preferences';

type fetchRecommendProps = {
  setDrinks: Dispatch<SetStateAction<ResultType[] | null>>;
  setError: Dispatch<SetStateAction<string>>;
  setIsSurveyCompleted: (completed: boolean) => void;
  userId?: string | undefined;
};

export const fetchGuestRecommend = async ({
  setDrinks,
  setError,
  setIsSurveyCompleted,
}: fetchRecommendProps) => {
  // 로컬 스토리지에서 전통주 추천 결과 조회
  const recoData = localStorage.getItem('recoData');

  if (recoData) {
    // 기존 추천 결과가 있으면 바로 적용
    setDrinks(JSON.parse(recoData));
    return;
  }

  const surveyData = JSON.parse(localStorage.getItem('surveyData') || '{}');

  if (!surveyData || Object.keys(surveyData).length === 0) {
    setError('설문조사를 먼저 진행해주세요');
    return;
  }

  // AI를 활용하여 전통주 추천 리스트 생성
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
  // 데이터베이스에서 전통주 추천 결과 조회
  const recoData = await fetchRecoData(userId);

  if (recoData.length > 0) {
    // 기존 추천 결과가 있으면 바로 적용
    setDrinks(recoData);
    return;
  }

  const surveyData = await fetchSurveyData(userId);

  if (!surveyData) {
    setError('설문조사를 먼저 진행해주세요');
    return;
  }

  // AI를 활용하여 전통주 추천 리스트 생성
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
    throw new Error('설문조사 저장 실패!');
  }
};
