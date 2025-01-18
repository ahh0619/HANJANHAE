import useModalStore from '@/store/modalStore';

const HomeScreenButton = () => {
  const { openModal } = useModalStore();

  return (
    <button
      onClick={openModal}
      className="mt-6 rounded-full bg-gray-500 px-6 py-2 text-sm font-semibold text-white hover:bg-gray-600"
    >
      필터
    </button>
  );
};

export default HomeScreenButton;
