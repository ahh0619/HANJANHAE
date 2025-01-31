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
    if (typeof window !== 'undefined' && window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => setIsMapLoaded(true));
    }
  }, []);

  return (
    <div id="map">
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
