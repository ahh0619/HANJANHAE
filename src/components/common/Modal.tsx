import { X } from 'lucide-react';
import React from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
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
  optionalAction?: {
    text: string;
    onClick: () => void;
  };
  showCloseButton?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  primaryAction,
  secondaryAction,
  optionalAction,
  showCloseButton,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-etc-white relative flex h-auto w-auto max-w-sm flex-col items-center justify-center rounded-xl p-5 text-center shadow-lg">
        {/* Close Button (X) */}
        {showCloseButton && (
          <button
            className="absolute right-3 top-3 text-black hover:text-gray-600"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Header */}
        <h2 className="text-lg font-semibold">{title}</h2>

        {/* Content */}
        <p className="mt-2 whitespace-pre-line text-sm font-medium">
          {content}
        </p>

        {/* Footer */}
        <div className="mt-4 flex flex-col items-center space-y-2">
          <div className="flex justify-center space-x-4">
            {/* Secondary Action */}
            {secondaryAction && (
              <button
                className="bg-etc-white w-[136px] rounded-lg border border-secondary p-3 font-medium text-primary hover:bg-secondary-hover"
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.text}
              </button>
            )}
            {/* Primary Action */}
            {primaryAction && (
              <button
                className="w-[136px] rounded-lg bg-primary p-3 font-semibold text-white hover:bg-primary-hover"
                onClick={primaryAction.onClick}
              >
                {primaryAction.text}
              </button>
            )}
          </div>

          {/* Optional Action */}
          {optionalAction && (
            <button
              className="mb-2 mt-3 p-4 text-sm text-gray-500 underline hover:text-gray-700"
              onClick={optionalAction.onClick}
            >
              {optionalAction.text}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
