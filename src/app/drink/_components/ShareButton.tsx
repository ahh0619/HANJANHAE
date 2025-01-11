'use client';

import { Share } from 'lucide-react';
import React, { useState } from 'react';

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

  const shareOptions = [
    {
      icon: '/fileicon.png',
      label: '링크복사',
      onClick: () => copyLinkToClipboard(url || window.location.href),
    },
    {
      icon: '/kakaotalk.png',
      label: '카카오톡',
      onClick: () =>
        shareViaKakao({
          title,
          description: text,
          imageUrl, // 이미지 URL 포함
          url: url || window.location.href,
        }),
    },
    {
      icon: '/twitter.png',
      label: '트위터',
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
        className="flex items-center justify-center rounded-full hover:bg-gray-50"
      >
        <Share size={24} className="text-black-400" />
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
