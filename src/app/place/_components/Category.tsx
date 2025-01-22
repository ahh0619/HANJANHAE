type CategoryProps = {
  items: {
    name: string;
    isSelected: boolean;
  }[];
  handleChange: (value: string) => void;
};

const Category = ({ items, handleChange }: CategoryProps) => {
  return (
    <>
      <div className="flex">
        {items.map((item) => (
          <div
            key={item.name}
            className={`w-1/3 text-label-lm ${item.isSelected ? 'border-b border-primary text-primary' : 'text-grayscale-300'} cursor-pointer pb-3 pt-2 text-center`}
            onClick={() => handleChange(item.name)}
          >
            {item.name}
          </div>
        ))}
      </div>

      <div className="relative mb-8">
        <div className="absolute left-[-20px] right-[-20px] h-[1px] bg-grayscale-300"></div>
      </div>
    </>
  );
};

export default Category;
