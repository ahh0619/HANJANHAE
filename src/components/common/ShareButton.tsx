'use client';

import { Share2 } from 'lucide-react';
import React, { useState } from 'react';

import { useToast } from '@/app/providers/ToastProvider';
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
  const { openToast } = useToast();

  const shareOptions = [
    {
      icon: '/assets/icons/share_button_Link.svg',
      label: '링크 복사',
      onClick: () => {
        copyLinkToClipboard(url || window.location.href);
        openToast('클립보드에 복사되었어요', 3000);
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
        className="hover:bg-grayscale-50 flex items-center justify-center rounded-full p-2"
      >
        <Share2 className="h-6 w-6 text-grayscale-900 transition-colors" />
      </button>
      <ShareModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        shareOptions={shareOptions}
      />
    </>
  );
};

export default ShareButton;
