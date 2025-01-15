'use client';

import { useState } from 'react';

import { PlaceWithMenusType } from '@/types/place';

import Category from './Category';
import Information from './Information';
import KakaoMap from './KakaoMap';
import Menu from './Menu';

type DetailSectionProps = {
  place: PlaceWithMenusType;
};

const CATEGORY_DATA = ['정보', '대표 메뉴', '지도'];

const DetailSection = ({ place }: DetailSectionProps) => {
  const [category, setCategory] = useState<string>(CATEGORY_DATA[0]);

  return (
    <>
      <Category
        items={CATEGORY_DATA.map((item) => ({
          name: item,
          isSelected: item === category,
        }))}
        handleChange={(value: string) => setCategory(value)}
      />

      {category === CATEGORY_DATA[0] && (
        <Information
          address={place.address}
          opening_hours={place.opening_hours}
          phone_number={place.phone_number}
        />
      )}

      {category === CATEGORY_DATA[1] && <Menu menus={place.menus} />}

      {category === CATEGORY_DATA[2] && (
        <KakaoMap location_x={place.location_x} location_y={place.location_y} />
      )}
    </>
  );
};

export default DetailSection;
