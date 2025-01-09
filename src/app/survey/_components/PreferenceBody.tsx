import { useState } from 'react';

type PreferenceBodyProps = {
  onNext: (data: { body: string }) => void;
  onPrev: () => void;
};

const PreferenceBody = ({ onNext, onPrev }: PreferenceBodyProps) => {
  const [selectedBody, setSelectedBody] = useState<string | null>(null);

  const handleSelect = (sweetness: string) => {
    setSelectedBody(sweetness);
  };

  const handleNext = () => {
    if (selectedBody) {
      onNext({ body: selectedBody });
    }
  };

  const options = [
    { value: '1', label: '매우 약함' },
    { value: '2', label: '약함' },
    { value: '3', label: '보통' },
    { value: '4', label: '강함' },
    { value: '5', label: '매우 강함' },
  ];

  return (
    <div className="flex flex-col items-center space-y-8 p-6">
      {/* 제목 */}
      <div className="relative w-full">
        <p className="absolute left-0" onClick={onPrev}>
          &lt;
        </p>
        <h1 className="text-center text-xl font-bold">내 취향 조사</h1>
      </div>

      {/* 진행바 */}
      <div className="flex items-center space-x-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-sm text-gray-500">
          1
        </span>
        <span className="h-[2px] w-5 bg-gray-300"></span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-sm text-gray-500">
          2
        </span>
        <span className="h-[2px] w-5 bg-gray-300"></span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-sm text-gray-500">
          3
        </span>
        <span className="h-[2px] w-5 bg-gray-300"></span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-sm text-gray-500">
          4
        </span>
        <span className="h-[2px] w-5 bg-gray-300"></span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-sm text-gray-500">
          5
        </span>
        <span className="h-[2px] w-5 bg-gray-300"></span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-sm text-white">
          6
        </span>
        <span className="h-[2px] w-5 bg-gray-300"></span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-sm text-gray-500">
          7
        </span>
      </div>

      {/* 질문 */}
      <div className="text-center">
        <h3 className="text-lg font-semibold">
          어느 정도의 무게감(바디감)을 선호하시나요?
        </h3>
      </div>

      <div className="flex w-full justify-between space-x-8">
        {options.map((option, index) => (
          <div
            key={option.value}
            className="flex cursor-pointer flex-col items-center"
            onClick={() => handleSelect(option.value)}
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                selectedBody === option.value
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 bg-white text-transparent'
              }`}
            >
              {selectedBody === option.value && (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            {index % 2 === 0 && (
              <span
                className={`mt-2 text-xs ${
                  selectedBody === option.value
                    ? 'font-bold text-black'
                    : 'text-gray-400'
                }`}
              >
                {option.label}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* 버튼 */}
      <div className="fixed bottom-0 left-0 flex w-full flex-col items-center space-y-4 bg-white p-4">
        <button
          className={`w-full rounded-lg py-3 ${
            selectedBody
              ? 'bg-black text-white'
              : 'cursor-not-allowed bg-gray-300 text-gray-500'
          }`}
          onClick={handleNext}
          disabled={!selectedBody}
        >
          다음
        </button>
        <button className="text-sm text-gray-500 underline">그만할래요</button>
      </div>
    </div>
  );
};

export default PreferenceBody;
