import React, { useRef } from 'react';

import OptimizedImage from '@/components/common/OptimizedImage';

type ProfileImageUploadProps = {
  preview: string | null;
  onFileChange: (file: File | null) => void;
  onRemoveImage?: () => void;
};

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  preview,
  onFileChange,
  onRemoveImage,
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
    <div className="relative mb-5 h-[100px] w-[100px]">
      {/* 프로필 이미지 레이블 */}
      <label className="group relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-full">
        <OptimizedImage
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

      <button
        type="button"
        onClick={handleButtonClick}
        className="absolute -bottom-2 -right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-grayscale-500 bg-secondary-100 p-1 shadow-md"
      >
        <OptimizedImage src="/assets/icons/camera.svg" alt="카메라 아이콘" />
      </button>

      <button
        type="button"
        onClick={onRemoveImage}
        className="absolute -bottom-2 left-1/2 mb-[-1.5rem] w-full -translate-x-1/2 px-3 py-1 text-caption-mm text-grayscale-600 hover:underline"
      >
        이미지 삭제
      </button>
    </div>
  );
};

export default ProfileImageUpload;
