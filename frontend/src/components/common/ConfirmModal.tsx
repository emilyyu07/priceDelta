import React, { useEffect, useRef } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from './Button';

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  variant = 'danger',
  onConfirm,
  onCancel,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  // Focus the cancel button when modal opens (safe default)
  useEffect(() => {
    if (isOpen) {
      cancelRef.current?.focus();
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const iconColor = variant === 'danger' ? 'text-red-500' : 'text-amber-500';
  const iconBg = variant === 'danger'
    ? 'bg-red-50 border-red-100'
    : 'bg-amber-50 border-amber-100';

  return (
    // Backdrop
    <div
      className="confirm-modal-backdrop"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      {/* Modal Card */}
      <div
        className="confirm-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-3 right-3 p-1 rounded-full text-primary-400 hover:text-primary-700 hover:bg-primary-100 transition-colors"
          onClick={onCancel}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Icon */}
        <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border ${iconBg}`}>
          <AlertTriangle className={`h-7 w-7 ${iconColor}`} />
        </div>

        {/* Title */}
        <h2
          id="confirm-modal-title"
          className="text-xl font-semibold text-primary-900 text-center mb-2"
        >
          {title}
        </h2>

        {/* Message */}
        <p className="text-primary-600 text-center text-sm leading-relaxed mb-6">
          {message}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            ref={cancelRef}
            variant="secondary"
            className="flex-1"
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            className="flex-1"
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
