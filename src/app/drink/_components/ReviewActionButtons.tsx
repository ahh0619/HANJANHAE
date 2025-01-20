type ReviewActionButtonsProps = {
  isEditValid: boolean;
  onSave: () => void;
  onCancel: () => void;
};

const ReviewActionButtons = ({
  isEditValid,
  onSave,
  onCancel,
}: ReviewActionButtonsProps) => {
  return (
    <div className="flex justify-end space-x-2">
      {/* 취소 버튼 */}
      <button
        type="button"
        onClick={onCancel}
        className="rounded-lg border border-primary px-4 py-2 text-label-mb text-primary hover:bg-secondary-hover"
      >
        취소
      </button>

      {/* 완료 버튼 */}
      <button
        type="button"
        onClick={onSave}
        disabled={!isEditValid}
        className={
          !isEditValid
            ? 'rounded-lg bg-grayscale-200 px-4 py-2 text-label-mb text-etc-white'
            : 'rounded-lg bg-primary px-4 py-2 text-label-mb text-etc-white hover:bg-primary-hover'
        }
      >
        완료
      </button>
    </div>
  );
};

export default ReviewActionButtons;
