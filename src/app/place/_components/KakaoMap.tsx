import Script from 'next/script';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

type PlaceMapProps = {
  location_x: number;
  location_y: number;
};

const KakaoMap = ({ location_x, location_y }: PlaceMapProps) => {
  const handleMoveToMap = () => {
    const kakaoMapUrl = `https://map.kakao.com/link/map/${location_x},${location_y}`;
    window.open(kakaoMapUrl, '_blank');
  };

  return (
    <div>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`}
        strategy="beforeInteractive"
      />
      <Map
        className="h-[200px] w-full bg-gray-200"
        center={{ lat: location_x, lng: location_y }}
        level={3}
      >
        <MapMarker
          position={{ lat: location_x, lng: location_y }}
          onClick={handleMoveToMap}
        />
      </Map>
    </div>
  );
};

export default KakaoMap;
