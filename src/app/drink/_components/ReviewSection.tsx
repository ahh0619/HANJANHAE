import { Database } from '@/types/supabase';

type Review = Database['public']['Tables']['comments']['Row'];

type ReviewSectionProps = {
  reviews: Review[];
};

const ReviewSection = ({ reviews }: ReviewSectionProps) => {
  return (
    <section className="p-4">
      <h3 className="text-lg font-bold">리뷰</h3>
      <div className="mt-4">
        <textarea
          className="h-20 w-full rounded-lg border p-2 text-sm"
          placeholder="리뷰를 작성해 주세요"
        ></textarea>
        <button className="mt-2 w-full rounded-lg bg-gray-700 py-2 text-sm text-white">
          등록
        </button>
      </div>
      <div className="mt-6 space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="space-y-2">
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">
                      {review.user_id || '익명 사용자'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(review.created_at || '').toLocaleDateString()}
                    </span>
                  </div>
                  <div className="w-full rounded-lg bg-gray-100 p-4 text-sm">
                    <p>{review.content}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">등록된 리뷰가 없습니다.</p>
        )}
      </div>
    </section>
  );
};

export default ReviewSection;
