import { X } from 'lucide-react';
import React from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose?: () => void;
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
      <div className="relative flex h-auto w-auto max-w-sm flex-col items-center justify-center rounded-xl bg-etc-white p-5 text-center shadow-lg xl:w-[400px] xl:px-3 xl:py-5">
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
        <h2 className="text-title-lb">{title}</h2>

        {/* Content */}
        <p className="mt-4 whitespace-pre-line text-label-lm">{content}</p>

        {/* Footer */}
        <div className="mt-[20px] flex flex-col items-center space-y-2">
          <div className="flex justify-center space-x-2">
            {/* Secondary Action */}
            {secondaryAction && (
              <button
                className="w-[136px] rounded-[8px] border border-secondary bg-etc-white px-4 py-3 text-title-mb text-primary hover:bg-secondary-hover xl:w-[164px]"
                onClick={secondaryAction.onClick}
                onMouseDown={(e) => e.stopPropagation()}
              >
                {secondaryAction.text}
              </button>
            )}
            {/* Primary Action */}
            {primaryAction && (
              <button
                className="w-[136px] rounded-[8px] bg-primary px-4 py-3 text-title-mb text-white hover:bg-primary-hover xl:w-[164px]"
                onClick={primaryAction.onClick}
              >
                {primaryAction.text}
              </button>
            )}
          </div>

          {/* Optional Action */}
          {optionalAction && (
            <button
              className="mt-6 text-label-mm text-grayscale-500 underline hover:text-grayscale-700 xl:mb-5"
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
