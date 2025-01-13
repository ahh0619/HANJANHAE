import UserInitializer from '@/components/auth/UserInitializer';
import MockSection from '@/components/common/MockSection';

const Home = () => {
  return (
    <>
      <MockSection />
      <UserInitializer />
      <div className="flex items-center bg-red-500 p-4 text-center hover:bg-blue-500"></div>
    </>
  );
};

export default Home;
