import React from 'react';

import OptimizedImage from '@/components/common/OptimizedImage';

type ProfileNicknameInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const ProfileNicknameInput: React.FC<ProfileNicknameInputProps> = ({
  value,
  onChange,
}) => (
  <div className="relative w-full">
    <label
      htmlFor="nickname"
      className="self-start text-title-mm text-grayscale-900"
    >
      닉네임
    </label>
    <input
      id="nickname"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="!mt-1 h-12 w-full rounded-lg border border-grayscale-300 p-3 text-caption-lm"
    />
    {value.length > 0 && (
      <button
        type="button"
        onClick={() => onChange('')}
        className="absolute bottom-16 right-3 top-10 -translate-y-1/2 transform p-2 text-grayscale-500"
      >
        <OptimizedImage src="/assets/icons/cancel.svg" alt="입력 지우기 버튼" />
      </button>
    )}
  </div>
);

export default ProfileNicknameInput;
