import React, { useEffect, useState, useCallback } from 'react';
import styles from './Toast.module.scss';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
  showCloseButton?: boolean;
  id?: string;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 5000,
  onClose,
  showCloseButton = true,
  id,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, handleClose]);

  if (!isVisible) return null;

  const iconMap = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  };

  return (
    <div
      id={id}
      className={`${styles.toast} ${styles[type]} ${isExiting ? styles.exiting : ''}`}
      role="alert"
      aria-live="polite"
    >
      <div className={styles.toastContent}>
        <span className={styles.toastIcon}>{iconMap[type]}</span>
        <span className={styles.toastMessage}>{message}</span>
      </div>
      {showCloseButton && (
        <button
          className={styles.toastClose}
          onClick={handleClose}
          aria-label="Close notification"
        >
          ×
        </button>
      )}
    </div>
  );
};
