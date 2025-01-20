'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

import { cn } from '@/lib/utils';

interface DualRangeSliderProps
  extends React.ComponentProps<typeof SliderPrimitive.Root> {
  labelPosition?: 'top' | 'bottom';
  label?: (value: number | undefined) => React.ReactNode;
  initialInteracted?: boolean; // 상위 컴포넌트에서 초기 상태 관리
}

const DualRangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  DualRangeSliderProps
>(
  (
    {
      className,
      label,
      labelPosition = 'top',
      initialInteracted = false,
      ...props
    },
    ref,
  ) => {
    const [isInteracted, setIsInteracted] = React.useState(initialInteracted);

    const handleValueChange = (newValues: number[]) => {
      setIsInteracted(true);
      props.onValueChange?.(newValues); // 기존 핸들러 호출
    };

    return (
      <div className="relative w-full">
        <SliderPrimitive.Root
          ref={ref}
          className={cn(
            'relative flex w-full touch-none select-none items-center',
            className,
          )}
          {...props}
          onValueChange={handleValueChange}
        >
          {/* 당장 해결하기에 너무 빡세서 일단 해결하지 않음*/}
          {/* <span
            className={cn(
              'absolute left-[50%] h-[20px] w-[20px] translate-x-[-50%] rounded-full transition-all',
              isInteracted
                ? 'bg-primary-100 opacity-100' // 활성화 상태
                : 'bg-gray-200 opacity-0', // 초기 상태에서 숨김
            )}
          ></span> */}
          <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-300">
            <SliderPrimitive.Range
              className={cn(
                'absolute h-full transition-colors',
                isInteracted ? 'bg-primary-100' : 'bg-gray-200',
              )}
            />
          </SliderPrimitive.Track>
          {Array.isArray(props.value) &&
            props.value.map((value, index) => (
              <React.Fragment key={index}>
                <SliderPrimitive.Thumb
                  className={cn(
                    'bg-background ring-offset-background focus-visible:ring-ring relative block h-[20px] w-[20px] rounded-full border-2 transition-colors',
                    isInteracted
                      ? 'border-primary-100 bg-primary-100'
                      : 'border-gray-200 bg-gray-200',
                  )}
                />
              </React.Fragment>
            ))}
        </SliderPrimitive.Root>
        <div className="absolute top-[14px] flex w-full justify-between text-caption-mm font-medium text-gray-900">
          <span className="text-left">
            저도수
            <br />
            (14도 이하)
          </span>
          <span className="text-center">
            중간 도수
            <br />
            (15~30도)
          </span>
          <span className="text-right">
            고도수
            <br />
            (31도 이상)
          </span>
        </div>
      </div>
    );
  },
);
DualRangeSlider.displayName = 'DualRangeSlider';

export { DualRangeSlider };

