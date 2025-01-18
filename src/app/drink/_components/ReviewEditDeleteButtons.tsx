'use client';

type EditDeleteButtonsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

const ReviewEditDeleteButtons = ({
  onEdit,
  onDelete,
}: EditDeleteButtonsProps) => {
  return (
    <div className="flex text-label-mm hover:text-grayscale-500">
      <button onClick={onDelete} className="p-3 hover:text-grayscale-800">
        삭제
      </button>

      <button onClick={onEdit} className="p-3 hover:text-grayscale-800">
        수정
      </button>
    </div>
  );
};

export default ReviewEditDeleteButtons;
