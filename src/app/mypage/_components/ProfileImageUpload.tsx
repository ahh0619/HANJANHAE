import Image from 'next/image';
import React, { useRef } from 'react';

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
    <div className="relative mb-5 flex h-[100px] w-[100px] items-center justify-center rounded-full">
      {/* Profile Image */}
      <label className="relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-full">
        <Image
          src={preview || '/assets/icons/default_profile_image.svg'}
          alt="프로필 이미지"
          width={100}
          height={100}
          className="rounded-full object-cover"
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
        className="absolute -bottom-2 -right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-grayscale-500 bg-secondary-100 p-1 shadow-md"
        onClick={handleButtonClick}
      >
        <Image
          src="/assets/icons/camera.svg"
          alt="카메라 아이콘"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default ProfileImageUpload;
