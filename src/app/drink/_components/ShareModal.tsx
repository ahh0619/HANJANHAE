'use client';

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
      <div className="w-80 rounded-lg bg-white p-6 shadow-lg">
        {/* 모달 제목 */}
        <h2 className="text-center text-lg font-bold text-gray-800">
          공유하기
        </h2>

        {/* 공유 옵션 */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          {shareOptions.map((option) => (
            <button
              key={option.label}
              onClick={option.onClick}
              className="flex flex-col items-center justify-center rounded p-2 text-center hover:bg-gray-100"
            >
              <img src={option.icon} alt={option.label} className="h-10 w-10" />
              <span className="mt-2 text-xs text-gray-600">{option.label}</span>
            </button>
          ))}
        </div>

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="mt-6 w-full rounded bg-gray-300 py-2 text-gray-700 hover:bg-gray-400"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
