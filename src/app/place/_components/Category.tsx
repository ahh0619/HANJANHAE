type CategoryProps = {
  items: {
    name: string;
    isSelected: boolean;
  }[];
  handleChange: (value: string) => void;
};

const Category = ({ items, handleChange }: CategoryProps) => {
  return (
    <div className="mb-8 flex">
      {items.map((item) => (
        <div
          key={item.name}
          className={`w-1/3 border-b text-label-lm ${item.isSelected ? 'border-primary text-primary' : 'border-grayscale-300 text-grayscale-300'} cursor-pointer pb-3 pt-2 text-center`}
          onClick={() => handleChange(item.name)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default Category;
