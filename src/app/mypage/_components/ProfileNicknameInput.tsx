import React from 'react';

type ProfileNicknameInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const ProfileNicknameInput: React.FC<ProfileNicknameInputProps> = ({
  value,
  onChange,
}) => (
  <div className="mb-6 w-full">
    <label
      htmlFor="nickname"
      className="mb-2 self-start text-title-mm text-grayscale-900"
    >
      닉네임
    </label>
    <input
      id="nickname"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border p-2 text-caption-lm"
    />
  </div>
);

export default ProfileNicknameInput;
