// DrinkDescription Component
const DrinkDescription = ({
  name,
  description,
}: {
  name: string;
  description: string | null;
}) => (
  <section className="border-b p-4">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold">{name}</h2>
      <div className="flex space-x-4">
        <button>❤️</button>
        <button>🔗</button>
      </div>
    </div>
    <p className="mt-2 text-sm text-gray-500">{description || '설명 없음'}</p>
  </section>
);

export default DrinkDescription;
