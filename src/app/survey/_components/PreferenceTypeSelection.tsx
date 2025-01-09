import Link from 'next/link';
import { useState } from 'react';

type PreferenceTypeSelectionProps = {
  onNext: (data: { type: string[] }) => void;
};

const PreferenceTypeSelection = ({ onNext }: PreferenceTypeSelectionProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleSelection = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type],
    );
  };

  const handleNext = () => {
    onNext({ type: selectedTypes });
  };

  const options = [
    '탁주',
    '증류주',
    '청주',
    '약주',
    '리큐르',
    '과실주',
    '기타 주류',
  ];

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      {/* 제목 */}
      <div className="relative w-full">
        <Link href="/">
          <p className="absolute left-0">&lt;</p>
        </Link>
        <h1 className="text-center text-xl font-bold">내 취향 조사</h1>
      </div>
      {/* 진행바 */}
      <div className="flex items-center space-x-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-sm text-white">
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
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-sm text-gray-500">
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
          어떤 종류의 술을 선호하시나요?
        </h3>
        <p className="text-sm text-gray-500">(중복 선택 가능)</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option}
            className={`rounded-full border px-4 py-2 ${
              selectedTypes.includes(option)
                ? 'border-black bg-black text-white'
                : 'border-gray-300 bg-gray-100 text-gray-700'
            } transition`}
            onClick={() => toggleSelection(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {/* 버튼 */}
      <div className="fixed bottom-0 left-0 flex w-full flex-col items-center space-y-4 bg-white p-4">
        <span className="text-sm text-gray-500">
          술종류 <span className="underline">?</span>
        </span>
        <button
          className={`w-full rounded-lg py-3 ${
            selectedTypes.length > 0
              ? 'bg-black text-white'
              : 'cursor-not-allowed bg-gray-300 text-gray-500'
          }`}
          onClick={handleNext}
          disabled={selectedTypes.length === 0}
        >
          다음
        </button>
        <button className="text-sm text-gray-500 underline">그만할래요</button>
      </div>
    </div>
  );
};

export default PreferenceTypeSelection;
