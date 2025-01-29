import Script from 'next/script';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useMediaQuery } from 'react-responsive';

type PlaceMapProps = {
  location_x: number;
  location_y: number;
  isSelected: boolean;
};

const KakaoMap = ({ location_x, location_y, isSelected }: PlaceMapProps) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  const handleMoveToMap = () => {
    const kakaoMapUrl = `https://map.kakao.com/link/map/${location_x},${location_y}`;
    window.open(kakaoMapUrl, '_blank');
  };

  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    setIsMapLoaded(true);
  }, []);

  return (
    <div id="map">
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`}
        strategy="beforeInteractive"
      />

      <p className="hidden text-title-lb text-grayscale-900 xl:inline">지도</p>
      {isMapLoaded && ((!isDesktop && isSelected) || isDesktop) && (
        <Map
          className="h-[200px] w-full bg-gray-200 xl:mt-5 xl:h-[310px]"
          center={{ lat: location_x, lng: location_y }}
          level={3}
        >
          <MapMarker
            position={{ lat: location_x, lng: location_y }}
            onClick={handleMoveToMap}
          />
        </Map>
      )}
    </div>
  );
};

export default KakaoMap;
