import { X } from 'lucide-react';
import React from 'react';

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
      className="!mt-1 w-full rounded-lg border p-2 text-caption-lm"
    />
    {value.length > 0 && (
      <button
        type="button"
        onClick={() => onChange('')}
        className="absolute bottom-16 right-3 top-1/2 -translate-y-1/2 transform text-grayscale-500"
      >
        <X size={20} />
      </button>
    )}
  </div>
);

export default ProfileNicknameInput;
