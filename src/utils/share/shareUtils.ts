export const initializeKakao = (): boolean => {
  if (typeof window === 'undefined' || !window.Kakao) {
    return false;
  }

  const KAKAO_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
  if (!KAKAO_APP_KEY) {
    return false;
  }

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(KAKAO_APP_KEY);
  }

  return true;
};

export const copyLinkToClipboard = (url: string) => {
  navigator.clipboard
    .writeText(url)
    .catch(() => console.error('링크 복사에 실패했습니다.'));
};

export const shareViaKakao = ({
  title,
  description,
  imageUrl,
  url,
}: {
  title: string;
  description?: string;
  imageUrl: string;
  url: string;
}) => {
  if (!initializeKakao()) {
    return;
  }

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title,
      description: description || '',
      imageUrl,
      link: {
        webUrl: url,
        mobileWebUrl: url,
      },
    },
    buttons: [
      {
        title: '자세히 보기',
        link: {
          webUrl: url,
          mobileWebUrl: url,
        },
      },
    ],
  });
};
