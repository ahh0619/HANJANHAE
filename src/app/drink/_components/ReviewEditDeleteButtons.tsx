type EditDeleteButtonsProps = {
  onEdit: () => void;
  onDelete: () => void;
  isEditing: boolean;
};

const ReviewEditDeleteButtons = ({
  onEdit,
  onDelete,
  isEditing,
}: EditDeleteButtonsProps) => {
  return (
    <div className="text-label-sm flex space-x-2 hover:text-grayscale-500">
      {!isEditing && (
        <button onClick={onEdit} className="hover:text-grayscale-800">
          수정
        </button>
      )}
      <button onClick={onDelete} className="hover:text-grayscale-800">
        삭제
      </button>
    </div>
  );
};

export default ReviewEditDeleteButtons;
