type ReviewActionButtonsProps = {
  canEdit: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

const ReviewActionButtons = ({
  canEdit,
  onEdit,
  onDelete,
}: ReviewActionButtonsProps) => {
  if (!canEdit) return null;

  return (
    <div className="mt-2 flex justify-end space-x-4">
      <button
        className="text-sm text-blue-500 hover:underline"
        onClick={onEdit}
      >
        수정
      </button>
      <button
        className="text-sm text-red-500 hover:underline"
        onClick={onDelete}
      >
        삭제
      </button>
    </div>
  );
};

export default ReviewActionButtons;
