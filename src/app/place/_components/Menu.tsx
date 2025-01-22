import Image from 'next/image';

import { MenuType } from '@/types/place';

type MenuProps = {
  menus: MenuType[];
};

const Menu = ({ menus }: MenuProps) => {
  return (
    <div className="flex flex-col gap-5">
      {menus.map((menu: MenuType) => (
        <div className="flex items-center gap-5" key={menu.id}>
          {menu.image && (
            <Image
              className="h-24 w-[136px] object-cover rounded-[8px]"
              width={136}
              height={96}
              src={menu.image}
              alt={menu.name}
            />
          )}
          <p>{menu.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Menu;
