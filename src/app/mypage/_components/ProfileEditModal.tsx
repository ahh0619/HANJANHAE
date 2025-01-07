'use client';

import Image from 'next/image';
import React, { useState } from 'react';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-11/12 max-w-sm rounded-lg bg-white p-6">
        <button className="absolute right-4 top-4 text-xl" onClick={onClose}>
          ×
        </button>
        <h2 className="mb-4 text-center text-lg font-bold">프로필 수정</h2>
        <div className="flex flex-col items-center">
          <label
            htmlFor="file-upload"
            className="border-gray border-gray border-black-100 relative mb-6 flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-black"
          >
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xl font-semibold">프사</span>
            )}
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <label
            htmlFor="nickname"
            className="mb-2 self-start text-sm font-medium text-gray-700"
          >
            닉네임
          </label>
          <input
            id="nickname"
            type="text"
            className="mb-6 w-full rounded-lg border p-2 text-sm"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={onClose}
            className="mr-2 w-1/2 rounded-lg bg-gray-300 py-2 text-sm font-medium"
          >
            취소
          </button>
          <button
            onClick={() => alert('프로필 수정 완료!')}
            className="ml-2 w-1/2 rounded-lg bg-gray-700 py-2 text-sm font-medium text-white"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
