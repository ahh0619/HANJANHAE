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
    <div className="px-2">
      <Map
        className="h-48 w-full bg-gray-200"
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
