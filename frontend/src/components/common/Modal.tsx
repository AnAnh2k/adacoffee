import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}) => {
  // Ngăn cuộn trang body khi modal được mở
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay mờ kính */}
      <div 
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity duration-300 animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />

      {/* Nội dung Modal */}
      <div 
        className={`relative w-full ${sizeClasses[size]} bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden z-10 transform transition-all duration-300 animate-[zoomIn_0.2s_ease-out]`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/50">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-800">{title}</h3>
          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 transition-colors p-1.5 rounded-lg hover:bg-stone-100 cursor-pointer flex items-center justify-center"
          >
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 text-stone-600 text-sm leading-relaxed">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex justify-end gap-3 px-6 py-4 bg-stone-50/50 border-t border-stone-100">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
