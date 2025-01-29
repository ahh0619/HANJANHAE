import OptimizedImage from '@/components/common/OptimizedImage';
import { MenuType } from '@/types/place';

type MenuProps = {
  menus: MenuType[];
  isSelected: boolean;
};

const Menu = ({ menus, isSelected }: MenuProps) => {
  return (
    <div
      id="menu"
      className={`flex-col gap-5 ${isSelected ? 'flex' : 'hidden'} xl:flex xl:pb-[60px]`}
    >
      <p className="hidden text-title-lb text-grayscale-900 xl:inline">
        대표메뉴
      </p>

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
