import { ReviewReadOnlyContentProps } from '@/types/review';

const ReviewReadOnlyContent = ({ comment }: ReviewReadOnlyContentProps) => (
  <div
    className="grayscale-100 body-mm text-grayscale-900 rounded-lg p-3"
    style={{ whiteSpace: 'pre-wrap' }}
  >
    <p>{comment}</p>
  </div>
);

export default ReviewReadOnlyContent;
