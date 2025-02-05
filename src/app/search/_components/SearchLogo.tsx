import OptimizedImage from '@/components/common/OptimizedImage';

const SearchLogo = () => {
  return (
    <div className="mb-[48px] mt-[33.5px] block flex items-center justify-center xl:hidden">
      <OptimizedImage
        src="/assets/icons/logo.svg"
        alt="Logo"
        width={116}
        height={30}
      />
    </div>
  );
};

export default SearchLogo;
