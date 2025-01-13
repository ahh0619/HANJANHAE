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
      className="mb-2 self-start text-sm font-medium text-gray-700"
    >
      닉네임
    </label>
    <input
      id="nickname"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border p-2 text-sm"
    />
  </div>
);

export default ProfileNicknameInput;
