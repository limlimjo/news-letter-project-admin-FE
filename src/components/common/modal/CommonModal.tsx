interface CommonModalProps {
  isOpen: boolean;
  title?: string;
  message?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmClassName?: string;
  cancelClassName?: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const CommonModal: React.FC<CommonModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = "확인",
  cancelText = "취소",
  confirmClassName,
  cancelClassName,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const defaultCancelClass = "px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100";
  const defaultConfirmClass = "px-4 py-2 bg-black text-white rounded hover:bg-gray-800";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-lg p-6 w-128">
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button className={cancelClassName ?? defaultCancelClass} onClick={onClose}>
            {cancelText}
          </button>
          {onConfirm && (
            <button className={confirmClassName ?? defaultConfirmClass} onClick={onConfirm}>
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommonModal;
