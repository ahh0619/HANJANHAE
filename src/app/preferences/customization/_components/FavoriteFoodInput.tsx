const FavoriteFoodInput = ({ preferences, handleFoodChange }) => {
  return (
    <div className="mb-6">
      <label className="mb-3 block text-lg font-medium">
        선호하는 안주를 알려주세요. 어울리는 전통주를 추천해드려요.
      </label>
      <input
        type="text"
        value={preferences.food}
        onChange={handleFoodChange}
        className="w-full rounded-md border border-gray-300 p-2"
      />
    </div>
  );
};

export default FavoriteFoodInput;
