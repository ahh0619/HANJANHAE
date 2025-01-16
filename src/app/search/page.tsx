import FilterResults from './_components/FilterResults';
import FocusInput from './_components/FocusInput';
import SearchResults from './_components/SearchResults';

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
        <SearchResults />
      </div>
    </div>
  );
};

export default Search;
