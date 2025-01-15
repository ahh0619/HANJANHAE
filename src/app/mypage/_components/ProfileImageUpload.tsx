import React, { useRef } from 'react';
import { FiCamera } from 'react-icons/fi';

type ProfileImageUploadProps = {
  preview: string | null;
  onFileChange: (file: File | null) => void;
};

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  preview,
  onFileChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileChange(event.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full">
      {/* Profile Image */}
      <label className="relative flex h-full w-full cursor-pointer items-center justify-center rounded-full">
        <img
          src={preview || '/default-avatar.png'}
          alt="프로필 이미지"
          className="h-full w-full rounded-full object-cover"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInput}
        />
      </label>

      {/* Camera Icon Button */}
      <button
        type="button"
        className="absolute -bottom-1 -right-1 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-gray-400 bg-pink-200 p-1 shadow-md"
        onClick={handleButtonClick}
      >
        <FiCamera className="h-6 w-6 text-gray-500" />
      </button>
    </div>
  );
};

export default ProfileImageUpload;
