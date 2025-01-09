'use client';

const KakaoShareButton = ({
  title,
  description,
  imageUrl,
  webUrl,
}: {
  title: string;
  description: string;
  imageUrl: string;
  webUrl: string;
}) => {
  const handleKakaoShare = () => {
    if (typeof window === 'undefined' || !window.Kakao) {
      console.error('카카오 SDK가 초기화되지 않았습니다.');
      return;
    }

    if (!window.Kakao.isInitialized()) {
      console.error('카카오 SDK가 초기화되지 않았습니다!!!');
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed', // 피드 형식 메시지
      content: {
        title, // 공유 제목
        description, // 공유 설명
        imageUrl, // 공유할 이미지 URL
        link: {
          webUrl, // 데스크톱에서 열릴 링크
          mobileWebUrl: webUrl, // 모바일에서 열릴 링크
        },
      },
      buttons: [
        {
          title: '자세히 보기',
          link: {
            webUrl, // 데스크톱에서 열릴 링크
            mobileWebUrl: webUrl, // 모바일에서 열릴 링크
          },
        },
      ],
    });
  };

  return (
    <button
      onClick={handleKakaoShare}
      className="rounded bg-yellow-400 p-2 text-white hover:bg-yellow-500"
    >
      카카오톡 공유하기
    </button>
  );
};

export default KakaoShareButton;
