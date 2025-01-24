import OptimizedImage from '@/components/common/OptimizedImage';
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
            <OptimizedImage
              src={menu.image}
              alt={menu.name}
              className="rounded-[8px] object-cover"
              width={136}
              height={96}
            />
          )}
          <p>{menu.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Menu;
