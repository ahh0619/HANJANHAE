import { useMediaQuery } from 'react-responsive';

import OptimizedImage from '@/components/common/OptimizedImage';
import { MenuType } from '@/types/place';

type MenuProps = {
  menus: MenuType[];
  isSelected: boolean;
};

const Menu = ({ menus, isSelected }: MenuProps) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  return (
    <div
      id="menu"
      className={`flex-col gap-5 ${isSelected ? 'flex' : 'hidden'} xl:flex xl:pb-[60px]`}
    >
      <p className="hidden text-title-lb text-grayscale-900 xl:inline">
        대표메뉴
      </p>

      <div className="flex flex-col gap-5 xl:gap-4">
        {menus.map((menu: MenuType) => (
          <div className="flex items-center gap-5" key={menu.id}>
            {menu.image && (
              <OptimizedImage
                src={menu.image}
                alt={menu.name}
                className="h-[96px] w-[136px] rounded-[8px] object-cover xl:h-[136px] xl:w-[194px]"
                width={isDesktop ? 194 : 136}
                height={isDesktop ? 136 : 96}
              />
            )}
            <p>{menu.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
