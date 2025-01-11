import { ReviewReadOnlyContentProps } from '@/types/review';

const ReviewReadOnlyContent = ({ comment }: ReviewReadOnlyContentProps) => (
  <div
    className="rounded-lg bg-gray-100 p-3 text-sm text-gray-800"
    style={{ whiteSpace: 'pre-wrap' }}
  >
    <p>{comment}</p>
  </div>
);

export default ReviewReadOnlyContent;
