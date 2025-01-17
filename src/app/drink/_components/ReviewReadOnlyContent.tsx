import { ReviewReadOnlyContentProps } from '@/types/review';

const ReviewReadOnlyContent = ({
  comment,
  isEdited,
}: ReviewReadOnlyContentProps) => (
  <div
    className="!mt-4 min-h-14 rounded-2xl bg-grayscale-100 p-3 text-body-mm text-grayscale-900"
    style={{ whiteSpace: 'pre-wrap' }}
  >
    <p className="text-body-mm text-grayscale-900">
      {comment}
      {isEdited && (
        <span className="ml-2 text-caption-mm text-grayscale-500">
          {`(편집됨)`}
        </span>
      )}
    </p>
  </div>
);

export default ReviewReadOnlyContent;
