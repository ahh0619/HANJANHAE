'use client';

import { Share2 } from 'lucide-react';
import React, { useState } from 'react';

import Toast from '@/components/common/Toast';
import { copyLinkToClipboard, shareViaKakao } from '@/utils/share/shareUtils';

import ShareModal from './ShareModal';

type ShareButtonProps = {
  title: string;
  text?: string;
  url?: string;
  imageUrl?: string;
};

const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  text,
  url,
  imageUrl = 'https://via.placeholder.com/300',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const shareOptions = [
    {
      icon: '/assets/icons/share_button_Link.svg',
      label: '링크 복사',
      onClick: () => {
        copyLinkToClipboard(url || window.location.href);
        setToastMessage('클립보드에 복사되었어요');
      },
    },
    {
      icon: '/assets/icons/share_button_Kakao.svg',
      label: '카카오톡',
      onClick: () => {
        shareViaKakao({
          title,
          description: text,
          imageUrl,
          url: url || window.location.href,
        });
      },
    },
    {
      icon: '/assets/icons/share_button_X.svg',
      label: 'X',
      onClick: () =>
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            title,
          )}&url=${encodeURIComponent(url || window.location.href)}`,
          '_blank',
        ),
    },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center rounded-full hover:bg-grayscale-50"
      >
        <Share2 className="text-black-400 ml-2 h-5 w-5 transition-colors sm:h-6 sm:w-6" />
      </button>
      <ShareModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        shareOptions={shareOptions}
      />
      {toastMessage && (
        <Toast
          message={toastMessage}
          duration={3000}
          onClose={() => setToastMessage(null)}
        />
      )}
    </>
  );
};

export default ShareButton;
