declare global {
  type Window = {
    Kakao: {
      init: (appKey: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (params: {
          objectType: string;
          content: {
            title: string;
            description: string;
            imageUrl: string;
            link: {
              webUrl: string;
              mobileWebUrl: string;
            };
          };
          buttons: {
            title: string;
            link: {
              webUrl: string;
              mobileWebUrl: string;
            };
          }[];
        }) => void;
      };
    };
  };
}

export {};
