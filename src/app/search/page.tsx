import FilterSearchResults from './_components/FilterSearchResults';
import FocusInput from './_components/FocusInput';

const Search = () => {
  return (
    <div>
      <div
        className="flex w-full flex-col items-center px-4"
        style={{ minWidth: '375px' }}
      >
        {/* Search Bar */}
        <FocusInput />
        {/* <FilterResults /> */}
        <FilterSearchResults />
      </div>
    </div>
  );
};

export default Search;
