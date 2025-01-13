'use client';
import { useState } from 'react';

import useFilterStore from '@/store/filterStore';

import { DualRangeSlider } from './_ui/DualRangeSliderProps';

const AlcholeStrength = () => {
  const [values, setValues] = useState([0, 100]);
  const { alcoholStrength, setAlcoholStrength } = useFilterStore();

  const handleStrengthChange = (strength: number) => {
    setAlcoholStrength(strength);
  };

  return (
    <div className="mb-6">
      <h3 className="mb-2 text-sm font-semibold">도수로 찾기</h3>
      <DualRangeSlider
        label={(value) => <span>{value}℃</span>}
        min={0}
        value={values}
        onValueChange={setValues}
        max={100}
        step={1}
      />
    </div>
  );
};

export default AlcholeStrength;
