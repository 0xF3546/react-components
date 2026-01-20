import {
  createContext,
  useContext,
  useState,
  ReactNode,
  ComponentType
} from "react";
import { InputDialog } from "../components/InputDialog";
import { InputDialogOptions, InputResult, InputDialogProps } from "../types";
import React from "react";

type InputRequest = InputDialogOptions & {
  resolve: (value: InputResult) => void;
};

type InputContextType = {
  inputDialog: (options: InputDialogOptions) => Promise<InputResult>;
};

const InputContext = createContext<InputContextType | null>(null);

interface InputProviderProps {
  children: ReactNode;
  InputDialogComponent?: ComponentType<InputDialogProps>;
}

export function InputProvider({ 
  children, 
  InputDialogComponent = InputDialog
}: InputProviderProps) {
  const [inputRequest, setInputRequest] = useState<InputRequest | null>(null);

  const inputDialog = (options: InputDialogOptions) =>
    new Promise<InputResult>((resolve) => {
      setInputRequest({ ...options, resolve });
    });

  const close = (submitted: boolean, values: Record<string, any> = {}) => {
    inputRequest?.resolve({ submitted, values });
    setInputRequest(null);
  };

  return (
    <InputContext.Provider value={{ inputDialog }}>
      {children}

      {inputRequest && (
        <InputDialogComponent
          title={inputRequest.title}
          description={inputRequest.description}
          fields={inputRequest.fields}
          confirmText={inputRequest.confirmText}
          cancelText={inputRequest.cancelText}
          closable={inputRequest.closable}
          blur={inputRequest.blur}
          onSubmit={(values) => close(true, values)}
          onCancel={() => close(false)}
        />
      )}
    </InputContext.Provider>
  );
}

export function useInputDialog() {
  const ctx = useContext(InputContext);
  if (!ctx) {
    throw new Error(
      "useInputDialog must be used inside <InputProvider />"
    );
  }
  return ctx;
}
