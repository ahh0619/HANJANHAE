import { ReviewReadOnlyContentProps } from '@/types/review';

const ReviewReadOnlyContent = ({ comment }: ReviewReadOnlyContentProps) => (
  <div
    className="rounded-lg bg-grayscale-100 p-3 text-body-mm text-grayscale-900"
    style={{ whiteSpace: 'pre-wrap' }}
  >
    <p>{comment}</p>
  </div>
);

export default ReviewReadOnlyContent;
