'use client';

import { useState } from 'react';

import useFilterStore from '@/store/filterStore';

import { DualRangeSlider } from './_ui/DualRangeSliderProps';

const AlcholeStrength = () => {
  const { values, setValues, alcoholStrength, setAlcoholStrength } =
    useFilterStore();

  const getStrengthRange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      const ranges = value.map((val) => {
        if (val === 1) return { min: 0, max: 15 }; // 15 이하
        if (val === 2) return { min: 15, max: 30 }; // 15 ~ 30
        if (val === 3) return { min: 30, max: 100 }; // 30 이상
        return { min: 0, max: 100 }; // 기본값
      });

      const min = Math.min(...ranges.map((range) => range.min));
      const max = Math.max(...ranges.map((range) => range.max));

      return { min, max };
    }

    if (value === 1) return { min: 0, max: 15 };
    if (value === 2) return { min: 15, max: 30 };
    if (value === 3) return { min: 30, max: 100 };
    return { min: 0, max: 100 }; // 기본 값
  };
  const handleStrengthChange = (strength: number[]) => {
    const strengthRanges = getStrengthRange(strength);
    setAlcoholStrength([strengthRanges.min, strengthRanges.max]);
  };

  return (
    <div className="my-10 h-[102px]">
      <h3 className="mb-[22px] text-title-mb font-bold leading-[135%] text-grayscale-900">
        도수로 찾기
      </h3>
      <DualRangeSlider
        label={(value) => value}
        value={values}
        onValueChange={(newValues) => {
          setValues(newValues); // values 상태 변경
          handleStrengthChange(newValues); // alcoholStrength 업데이트
        }}
        min={1}
        max={3}
        step={1}
      />
    </div>
  );
};

export default AlcholeStrength;
