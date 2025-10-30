// components/uconnect/ConfirmModal.tsx
import { X, AlertTriangle } from 'lucide-react';
import styles from '../../styles/uconnect/ConfirmModal.module.scss';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  isLoading = false
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onCancel} />
      
      <div className={styles.modal}>
        <button 
          className={styles['close-btn']} 
          onClick={onCancel}
          disabled={isLoading}
        >
          <X size={20} />
        </button>

        <div className={styles.icon}>
          <AlertTriangle size={48} />
        </div>

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <button 
            className={styles['cancel-btn']} 
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button 
            className={styles['confirm-btn']} 
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Excluindo...' : confirmText}
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;