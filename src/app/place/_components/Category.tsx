type CategoryProps = {
  items: {
    id: string;
    name: string;
    isSelected: boolean;
  }[];
  handleChange: (id: string, name: string) => void;
};

const Category = ({ items, handleChange }: CategoryProps) => {
  return (
    <div className="bg-white xl:sticky xl:top-[102px] xl:z-10 xl:shrink-0">
      <div className="flex xl:w-[540px]">
        {items.map((item) => (
          <div
            key={item.name}
            className={`w-1/3 text-label-lm ${item.isSelected ? 'border-b border-primary text-primary' : 'text-grayscale-300'} cursor-pointer pb-3 pt-2 text-center`}
            onClick={() => handleChange(item.id, item.name)}
          >
            {item.name}
          </div>
        ))}
      </div>

      <div className="relative mb-8">
        <div className="absolute left-[-20px] right-[-20px] h-[1px] bg-grayscale-300 xl:left-[-24px] xl:right-[-24px]"></div>
      </div>
    </div>
  );
};

export default Category;
