'use client';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import * as React from 'react';

type DualRangeSliderProps = {
  value: number[];
  onValueChange: (newValues: number[]) => void;
  label?: (value: number | undefined) => React.ReactNode;
  min?: number;
  max?: number;
  step?: number;
};

const DualRangeSlider: React.FC<DualRangeSliderProps> = ({
  value,
  onValueChange,
  label,
  min = 1,
  max = 3,
  step = 1,
}) => {
  const handleSliderChange = (newValues: [number, number]) => {
    onValueChange(newValues);
  };

  const handleMidButtonClick = () => {
    const middleValue = Math.round((max + min) / 2); // 중앙값 계산
    if (value[0] === min && value[1] === max) {
      // 슬라이더 범위가 [min, max]일 때
      onValueChange([min, middleValue]); // [min, middleValue]로 축소
    } else {
      // 기본 동작: 중앙값 포함
      onValueChange([
        Math.min(value[0], middleValue),
        Math.max(value[1], middleValue),
      ]);
    }
  };

  return (
    <div className="relative w-full">
      {/* 슬라이더 */}
      <Slider
        range
        value={value}
        onChange={handleSliderChange}
        min={min}
        max={max}
        step={step}
        trackStyle={[
          { backgroundColor: '#BF324B', height: 8 },
          { backgroundColor: '#BF324B', height: 8 },
        ]}
        handleStyle={[
          { borderColor: '#BF324B', height: 18, width: 18 },
          { borderColor: '#BF324B', height: 18, width: 18 },
        ]}
        railStyle={{ backgroundColor: '#E0E0E0', height: 8 }}
      />

      {/* 범위 텍스트 및 중간 도수 동그라미 */}
      <div className="absolute top-[14px] flex w-full justify-between text-caption-mm font-medium text-gray-900">
        <div className="text-left">
          저도수
          <br />
          (14도 이하)
        </div>
        <div className="relative text-center">
          중간 도수
          <br />
          (15~30도)
          <div
            style={{
              zIndex:
                (value[0] === 1 && value[1] === 2) ||
                (value[0] === 2 && value[1] === 3)
                  ? -1
                  : 0,
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor:
                value[0] <= 2 && value[1] >= 2 ? '#BF324B' : '#E0E0E0',
            }}
            onClick={handleMidButtonClick}
          />
        </div>
        <div className="text-right">
          고도수
          <br />
          (31도 이상)
        </div>
      </div>
    </div>
  );
};

export { DualRangeSlider };

