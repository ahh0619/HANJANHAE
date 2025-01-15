import { MenuType } from '@/types/place';

type MenuProps = {
  menus: MenuType[];
};

const Menu = ({ menus }: MenuProps) => {
  return (
    <div className="flex flex-col gap-4 px-2">
      {menus.map((menu: MenuType) => (
        <div className="flex items-center gap-8" key={menu.id}>
          <div className="flex h-24 w-32 items-center justify-center overflow-hidden bg-gray-200">
            {menu.image && (
              <img
                className="h-full w-full object-cover"
                src={menu.image}
                alt={menu.name}
              />
            )}
          </div>
          <p>{menu.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Menu;
