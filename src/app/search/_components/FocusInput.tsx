'use client';

import { useState } from 'react';

import FilterModal from './FilterModal';

const FocusInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  const titleCategory = ['증류주', '막걸리', '전통주'];

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="mx-auto mt-4 w-full max-w-md text-center">
      {/* 검색바와 취소 버튼 */}
      <div
        className={`${
          isFocused ? 'mt-0' : 'mt-40'
        } mx-auto flex max-w-md items-center bg-white px-4 py-2 transition-all duration-300`}
      >
        <div
          className={`flex flex-1 items-center rounded-full px-4 py-2 shadow-sm transition ${
            isFocused ? 'border-2 border-green-500 bg-white' : 'bg-gray-100'
          }`}
        >
          <svg
            className={`h-5 w-5 ${
              isFocused ? 'text-green-500' : 'text-gray-500'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 16l4-4-4-4m5 4h7"
            />
          </svg>
          <input
            type="text"
            placeholder="무엇을 찾으시나요?"
            className="w-full bg-transparent pl-2 text-sm text-gray-700 outline-none"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        {isFocused && (
          <button
            className="ml-2 text-sm text-green-500"
            onClick={() => setIsFocused(false)}
          >
            취소
          </button>
        )}
      </div>
      {isFocused ? null : <FilterModal />}
      {/* 추천 검색어 (포커스가 있을 때만 표시) */}
      {isFocused && (
        <div className="mt-16">
          <p className="mb-2 text-gray-600">추천 검색어</p>
          <div className="flex gap-2">
            {titleCategory.map((word, index) => (
              <button
                key={index}
                className="rounded-full border px-4 py-1 text-sm"
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FocusInput;
