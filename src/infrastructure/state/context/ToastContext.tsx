/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, type ReactNode, useState, useContext } from "react";

interface ToastContextType {
  message: { text: string; role: string } | null;
  addAlert: (message: string, role: "SUCCESS" | "ERROR") => void;
  removeAlert: () => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

interface Props {
  children: ReactNode;
}

function ToastProvider({ children }: Props) {
  const [message, setMessage] = useState<{ text: string; role: string } | null>(
    null
  );

  const addAlert = (message: string, role: "SUCCESS" | "ERROR") =>
    setMessage({
      text: message,
      role,
    });
  const removeAlert = () => setMessage(null);

  return (
    <ToastContext.Provider
      value={{
        message,
        addAlert,
        removeAlert,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

function useToastContext(): ToastContextType {
  const context = useContext(ToastContext);
  if (context == null || !context) {
    throw new Error("useToast deve ser usado dentro de um ToastProvider");
  }
  return context;
}

export { ToastProvider, useToastContext };
