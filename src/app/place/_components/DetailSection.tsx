'use client';

import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { PlaceWithMenusType } from '@/types/place';

import Category from './Category';
import Information from './Information';
import KakaoMap from './KakaoMap';
import Menu from './Menu';

type DetailSectionProps = {
  place: PlaceWithMenusType;
};

const CATEGORY_DATA = [
  { id: 'information', name: '정보' },
  { id: 'menu', name: '대표 메뉴' },
  { id: 'map', name: '지도' },
];

const DetailSection = ({ place }: DetailSectionProps) => {
  const [category, setCategory] = useState<string>(CATEGORY_DATA[0].name);
  const [isIgnoreScroll, setIsIgnoreScroll] = useState<boolean>(false);

  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  const NAV_HEIGHT = 170;

  const handleChangeCategory = (id: string, name: string) => {
    setIsIgnoreScroll(true);

    setCategory(name);

    const element = document.getElementById(id);

    if (element) {
      const rect = element.getBoundingClientRect();
      const offset = window.scrollY + rect.top - NAV_HEIGHT;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }

    setTimeout(() => {
      setIsIgnoreScroll(false);
    }, 500);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!isDesktop || isIgnoreScroll) return;

      const menuElement = document.getElementById('menu');
      const mapElement = document.getElementById('map');

      if (!menuElement || !mapElement) return;

      const menuTop = menuElement.offsetTop;
      const mapTop = mapElement.offsetTop;

      const scrollPos = window.scrollY;
      if (window.scrollY + NAV_HEIGHT - 60 >= mapTop) {
        setCategory('지도');
      } else if (window.scrollY + NAV_HEIGHT - 60 >= menuTop) {
        setCategory('대표 메뉴');
      } else {
        setCategory('정보');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isIgnoreScroll, isDesktop]);

  return (
    <div className="px-5 pb-12 xl:pb-[220px]">
      <Category
        items={CATEGORY_DATA.map((item) => ({
          id: item.id,
          name: item.name,
          isSelected: item.name === category,
        }))}
        handleChange={handleChangeCategory}
      />

      <Information
        address={place.address}
        opening_hours={place.opening_hours}
        phone_number={place.phone_number}
        isSelected={category === CATEGORY_DATA[0].name}
      />

      <Menu
        menus={place.menus}
        isSelected={category === CATEGORY_DATA[1].name}
      />

      <KakaoMap
        location_x={place.location_x}
        location_y={place.location_y}
        isSelected={category === CATEGORY_DATA[2].name}
      />
    </div>
  );
};

export default DetailSection;
