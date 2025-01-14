'use client';

import { useState } from 'react';

import OptionItem from '@/app/survey/_components/OptionItem';
import BackButton from '@/components/common/BackButton';

const Page = () => {
  const [preferences, setPreferences] = useState({
    types: '',
    alcoholLevel: '',
    sweetness: null,
    acidity: null,
    cleanness: null,
    body: null,
    favoriteDrink: '',
  });

  const handleSliderChange = (name: string, value: number) => {
    setPreferences((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (type: string) => {
    setPreferences((prev) => {
      const typesArray = prev.types ? prev.types.split(',') : [];
      if (typesArray.includes(type)) {
        const updatedTypes = typesArray
          .filter((item) => item !== type)
          .join(',');
        return { ...prev, types: updatedTypes };
      } else {
        const updatedTypes = [...typesArray, type].join(',');
        return { ...prev, types: updatedTypes };
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreferences((prev) => ({ ...prev, favoriteDrink: e.target.value }));
  };

  const handleSelect = (key: string, value: string) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log('Preferences Saved:', preferences);
  };

  const alcoholOptions = [
    { value: '저도수', range: '(6~15도)' },
    { value: '중간도수', range: '(15~30도)' },
    { value: '고도수', range: '(30도 이상)' },
  ];

  const intensityOptions = [
    { value: '1', label: '매우 약함' },
    { value: '2', label: '약함' },
    { value: '3', label: '보통' },
    { value: '4', label: '강함' },
    { value: '5', label: '매우 강함' },
  ];

  const tasteAttributes = [
    { key: 'sweetness', label: '단맛' },
    { key: 'acidity', label: '신맛' },
    { key: 'cleanness', label: '청량감' },
    { key: 'body', label: '무게감' },
  ];

  const alcoholTypes = [
    { key: '탁주', label: '탁주' },
    { key: '증류주', label: '증류주' },
    { key: '청주', label: '청주' },
    { key: '약주', label: '약주' },
    { key: '리큐르', label: '리큐르' },
    { key: '과실주', label: '과실주' },
    { key: '기타주류', label: '기타주류' },
  ];

  const isFormComplete =
    preferences.types.length > 0 &&
    preferences.alcoholLevel &&
    preferences.sweetness !== null &&
    preferences.acidity !== null &&
    preferences.cleanness !== null &&
    preferences.body !== null &&
    preferences.favoriteDrink;

  return (
    <div className="mx-auto max-w-lg p-6">
      <div className="relative mb-5 flex w-full items-center">
        <div className="absolute left-0">
          <BackButton />
        </div>
        <h1 className="mx-auto text-xl font-bold">내 취향 조사</h1>
      </div>

      <div className="mb-6">
        <label className="mb-3 flex items-center text-lg font-medium">
          어떤 종류의 술을 선호하시나요?{' '}
          <span className="ml-1 text-sm">(중복 선택 가능)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {alcoholTypes.map((type) => (
            <button
              key={type.key}
              onClick={() => handleTypeChange(type.key)}
              className={`rounded-full border px-4 py-2 ${
                preferences.types.includes(type.key)
                  ? 'bg-black text-white'
                  : 'border-gray-300 bg-white text-black'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="mb-3 block text-lg font-medium">
          어느 정도 도수의 술을 선호하시나요?
        </label>
        <div className="flex w-full justify-between space-x-8">
          {alcoholOptions.map((option) => (
            <OptionItem
              key={option.value}
              value={option.value}
              label={option.value}
              range={option.range}
              isSelected={preferences.alcoholLevel === option.value}
              onSelect={(value) => handleSelect('alcoholLevel', value)}
            />
          ))}
        </div>
      </div>

      {tasteAttributes.map((attr) => (
        <div className="mb-6" key={attr.key}>
          <label className="mb-3 block text-lg font-medium">
            어느 정도의 {attr.label} 을 선호하시나요?
          </label>
          <div className="flex w-full justify-between space-x-8">
            {intensityOptions.map((option) => (
              <OptionItem
                key={option.value}
                value={option.value}
                label={option.label}
                isSelected={
                  preferences[attr.key] === parseInt(option.value, 10)
                }
                onSelect={(value) =>
                  handleSliderChange(attr.key, parseInt(value, 10))
                }
              />
            ))}
          </div>
        </div>
      ))}

      <div className="mb-6">
        <label className="mb-3 block text-lg font-medium">
          선호하는 안주를 알려주세요. 어울리는 전통주를 추천해드려요.
        </label>
        <input
          type="text"
          value={preferences.favoriteDrink}
          onChange={handleInputChange}
          className="w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isFormComplete}
        className={`mb-10 w-full rounded-md py-3 text-lg font-bold ${
          isFormComplete
            ? 'bg-black text-white'
            : 'cursor-not-allowed bg-gray-300 text-gray-500'
        }`}
      >
        저장하기
      </button>
    </div>
  );
};

export default Page;
