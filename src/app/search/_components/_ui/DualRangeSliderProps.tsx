'use client';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import * as React from 'react';

import useFocusStore from '@/store/focusStore';

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
  // 핸들을 드래그하거나 슬라이더가 변경되기 전에 상태를 업데이트
  const { isSliderClicked, setIsSliderClicked } = useFocusStore();
  const handleBeforeChange = () => {
    setIsSliderClicked(true);
  };

  const handleSliderChange = (newValues: [number, number]) => {
    setIsSliderClicked(true); // 슬라이더 값이 변경되면 클릭 상태로 변경
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

    setIsSliderClicked(true); // 버튼 클릭 시에도 트랙 색상을 업데이트
  };

  return (
    <div className="relative w-full">
      {/* 슬라이더 */}
      <Slider
        range
        value={value}
        onBeforeChange={handleBeforeChange} // 최초 드래그 시작 시 호출
        onChange={handleSliderChange} // 드래그 중 값이 변경될 때 호출
        min={min}
        max={max}
        step={step}
        styles={{
          track: {
            backgroundColor: isSliderClicked ? '#BF324B' : '#E0E0E0', // 클릭 여부에 따라 색상 변경
            height: 8,
          },
          handle: {
            borderColor: isSliderClicked ? '#BF324B' : '#E0E0E0', // 클릭 여부에 따라 색상 변경
            border: isSliderClicked ? 'solid 4px #BF324B' : 'solid 4px #E0E0E0',
            height: 18,
            width: 18,
          },
          rail: {
            backgroundColor: '#E0E0E0',
            height: 8,
          },
        }}
      />

      {/* 범위 텍스트 및 중간 도수 동그라미 */}
      <div className="absolute top-[14px] mt-[8px] flex w-full justify-between text-caption-mm font-medium text-gray-900">
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
              top: '-28px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: !isSliderClicked // 클릭 여부에 따라 초기 색상 유지
                ? '#E0E0E0'
                : value[0] <= 2 && value[1] >= 2
                  ? '#BF324B'
                  : '#E0E0E0',
            }}
            onClick={handleMidButtonClick} // 클릭 시 트랙 업데이트
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

