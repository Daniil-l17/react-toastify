import { createContext, useState } from 'react';
import { Toastify } from '../Toastify';
import { AnimatePresence } from 'framer-motion';
import { $ToastContainer } from './style';

export type ToastifyType = {
  type?: 'info' | 'success' | 'warning' | 'error';
  theme?: 'light' | 'dark' | 'colored';
  text?: string;
  id?: number;
  duration?: number;
  position?:
    | 'top-left'
    | 'top-right'
    | 'top-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center';
};

type ToastifyContextType = {
  handelCloseToastify: (id: number) => void;
  toastr: (text: string, options: ToastifyType) => void;
  handelCloseAllToastify: () => void;
};

export const ContextToastify = createContext<ToastifyContextType>({} as ToastifyContextType);

export const ToastContainer = ({ children }: { children: React.ReactNode }) => {
  const [toastrArray, setToastrArray] = useState<ToastifyType[]>([]);

  const handelCloseToastify = (id: number) => {
    setToastrArray(prevToastify => [...prevToastify].filter(item => item.id !== id));
  };

  function handelCloseAllToastify() {
    setToastrArray([]);
  }

  function toastr(text: string, options: Omit<ToastifyType, 'id'>): void {
    const result = {
      id: Date.now(),
      text,
      duration: options.duration ?? 3000,
      type: options.type ?? 'info',
      theme: options.theme ?? 'dark',
      position: options.position ?? 'top-right',
    };
    setToastrArray(prevToastify => [...prevToastify, result]);
  }

  return (
    <ContextToastify.Provider value={{ handelCloseToastify, toastr, handelCloseAllToastify }}>
      <$ToastContainer>
        <AnimatePresence mode="sync">
          {toastrArray.map(item => (
            <Toastify key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </$ToastContainer>
      {children}
    </ContextToastify.Provider>
  );
};
