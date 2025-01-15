type CategoryProps = {
  items: {
    name: string;
    isSelected: boolean;
  }[];
  handleChange: (value: string) => void;
};

const Category = ({ items, handleChange }: CategoryProps) => {
  return (
    <div className="flex px-2">
      {items.map((item) => (
        <div
          key={item.name}
          className={`w-1/3 border-b-2 ${item.isSelected ? 'border-black font-bold' : 'border-gray-300'} mb-4 cursor-pointer pb-2 text-center`}
          onClick={() => handleChange(item.name)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default Category;
