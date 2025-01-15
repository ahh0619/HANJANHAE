import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  primaryAction?: {
    text: string;
    onClick: () => void;
  };
  secondaryAction?: {
    text: string;
    onClick: () => void;
  };
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  primaryAction,
  secondaryAction,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex h-auto w-auto max-w-sm flex-col items-center justify-center rounded-xl bg-white p-4 text-center shadow-lg">
        {/* Header */}
        <h2 className="text-lg font-semibold">{title}</h2>

        {/* Content */}
        <p className="mt-2 whitespace-pre-line text-sm font-medium">
          {content}
        </p>

        {/* Footer */}
        <div className="mt-4 flex justify-center space-x-4">
          {secondaryAction && (
            <button
              className="w-[136px] rounded-lg border border-secondary bg-white p-2 font-medium text-primary hover:bg-secondary-hover"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.text}
            </button>
          )}
          {primaryAction && (
            <button
              className="w-[136px] rounded-lg bg-primary p-2 font-semibold text-white hover:bg-primary-hover"
              onClick={primaryAction.onClick}
            >
              {primaryAction.text}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
