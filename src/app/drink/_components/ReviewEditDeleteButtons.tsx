type EditDeleteButtonsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

const ReviewEditDeleteButtons = ({
  onEdit,
  onDelete,
}: EditDeleteButtonsProps) => {
  return (
    <div className="flex space-x-6 text-label-mm hover:text-grayscale-500">
      <button onClick={onDelete} className="hover:text-grayscale-800">
        삭제
      </button>

      <button onClick={onEdit} className="hover:text-grayscale-800">
        수정
      </button>
    </div>
  );
};

export default ReviewEditDeleteButtons;
