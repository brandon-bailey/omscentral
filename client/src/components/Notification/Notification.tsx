import React, { createContext, useState, useEffect } from 'react';
import { Nullable } from 'src/core';
import Toast, { Props as IToastProps, Variant } from './components/Toast';

type NotifyFn = (message: string) => void;

interface Notification {
  success: NotifyFn;
  warning: NotifyFn;
  error: NotifyFn;
  info: NotifyFn;
}

export const NotificationContext = createContext<Nullable<Notification>>(null);

const Notification: React.FC = ({ children }) => {
  const [toast, setToast] = useState<Nullable<Partial<IToastProps>>>(null);

  const notifyFnFactory = (variant: Variant): NotifyFn => (message) =>
    setToast({
      variant,
      message,
    });

  useEffect(() => {
    if (toast) {
      const timeoutId = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [toast, setToast]);

  return (
    <NotificationContext.Provider
      value={{
        success: notifyFnFactory('success'),
        warning: notifyFnFactory('warning'),
        error: notifyFnFactory('error'),
        info: notifyFnFactory('info'),
      }}
    >
      {children}
      {toast && (
        <Toast
          variant={toast.variant!}
          message={toast.message!}
          onClose={() => setToast(null)}
        />
      )}
    </NotificationContext.Provider>
  );
};

export default Notification;
