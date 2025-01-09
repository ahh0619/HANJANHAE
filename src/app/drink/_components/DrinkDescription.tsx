import ShareButton from './ShareButton';

const DrinkDescription = ({
  name,
  imageUrl,
  description,
}: {
  name: string;
  imageUrl: string;
  description: string | null;
}) => (
  <section className="border-b p-4">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold">{name}</h2>
      <div className="flex">
        <button>❤️</button>
        <ShareButton title={name} text={description!} imageUrl={imageUrl} />
      </div>
    </div>
    <p className="mt-2 text-sm text-gray-500">{description || '설명 없음'}</p>
  </section>
);

export default DrinkDescription;
