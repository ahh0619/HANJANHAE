import React from 'react';

type ProfileImageUploadProps = {
  preview: string | null;
  onFileChange: (file: File | null) => void;
};

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  preview,
  onFileChange,
}) => {
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileChange(event.target.files[0]);
    }
  };

  return (
    <label
      htmlFor="file-upload"
      className="relative mb-6 flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full"
    >
      <img
        src={preview || '/default-avatar.png'}
        alt="프로필 이미지"
        className="h-full w-full rounded-full object-cover"
      />
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInput}
      />
    </label>
  );
};

export default ProfileImageUpload;
