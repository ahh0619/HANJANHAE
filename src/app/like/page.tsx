'use client';

import { useQuery } from '@tanstack/react-query';

import ProductCard from '@/components/common/ProductCard';
import { useAuthStore } from '@/store/authStore';
import { fetchLikesByUser } from '@/utils/like/action';

const Page = () => {
  const { user } = useAuthStore();

  const {
    data: likesData,
    isPending,
    error,
  } = useQuery({
    queryKey: ['likes'],
    queryFn: () => fetchLikesByUser(user.id),
    enabled: !!user,
  });
  console.log('data: ', likesData);

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="py-4 text-center text-2xl font-bold">좋아요</h1>

      <div className="mt-5 grid grid-cols-2 gap-4">
        {likesData.map((like) => (
          <ProductCard
            key={like.id}
            id={like.id}
            name={like.drinks.name}
            imageUrl={like.drinks.image}
            userId={like.user_id}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
