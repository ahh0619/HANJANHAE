type ReviewActionButtonsProps = {
  canEdit: boolean;
  onSave: () => void;
  onCancel: () => void;
};

const ReviewActionButtons = ({
  canEdit,
  onSave,
  onCancel,
}: ReviewActionButtonsProps) => {
  if (!canEdit) return null;

  return (
    <div className="flex justify-end space-x-2">
      <button
        className="rounded-lg border border-primary px-4 py-2 text-label-mb text-primary hover:bg-secondary-hover"
        onClick={onCancel}
      >
        취소
      </button>
      <button
        className="rounded-lg bg-primary px-4 py-2 text-label-mb text-etc-white hover:bg-primary-hover"
        onClick={onSave}
      >
        완료
      </button>
    </div>
  );
};

export default ReviewActionButtons;
