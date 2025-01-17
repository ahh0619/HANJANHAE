'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

type ShareOption = {
  icon: string;
  label: string;
  onClick: () => void;
};

type ShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
  shareOptions: ShareOption[];
};

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  shareOptions,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-80 rounded-lg bg-etc-white p-6 shadow-lg">
        {/* 닫기 아이콘 (오른쪽 상단) */}
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-grayscale-900 hover:text-grayscale-500"
        >
          <X className="h-6 w-6" />
        </button>

        {/* 모달 제목 */}
        <h2 className="text-center text-title-lb text-grayscale-900">
          공유를 하시겠어요?
        </h2>

        {/* 공유 옵션 */}
        <div className="mt-4 flex justify-center">
          <div className="grid w-52 grid-cols-3 gap-8">
            {shareOptions.map((option) => (
              <button
                key={option.label}
                onClick={option.onClick}
                className="flex flex-col items-center justify-center space-y-2"
              >
                <Image
                  src={option.icon}
                  alt={option.label}
                  width={48}
                  height={48}
                  className="rounded"
                />
                <span className="w-20 truncate text-center text-label-mm text-black">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
