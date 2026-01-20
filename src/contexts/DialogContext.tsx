import {
  createContext,
  useContext,
  useState,
  ReactNode,
  ComponentType
} from "react";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { ConfirmOptions, DialogProps } from "../types";
import React from "react";

type DialogRequest = ConfirmOptions & {
  resolve: (value: boolean) => void;
};

type DialogContextType = {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
};

const DialogContext = createContext<DialogContextType | null>(null);

interface DialogProviderProps {
  children: ReactNode;
  DialogComponent?: ComponentType<DialogProps>;
}

export function DialogProvider({ 
  children, 
  DialogComponent = ConfirmDialog 
}: DialogProviderProps) {
  const [dialog, setDialog] = useState<DialogRequest | null>(null);

  const confirm = (options: ConfirmOptions) =>
    new Promise<boolean>((resolve) => {
      setDialog({ ...options, resolve });
    });

  const close = (result: boolean) => {
    dialog?.resolve(result);
    setDialog(null);
  };

  return (
    <DialogContext value={{ confirm }}>
      {children}

      {dialog && (
        <DialogComponent
          {...dialog}
          onConfirm={() => close(true)}
          onCancel={() => close(false)}
        />
      )}
    </DialogContext>
  );
}

export function useConfirm() {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error(
      "useConfirm must be used inside <DialogProvider />"
    );
  }
  return ctx.confirm;
}

export function useDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error(
      "useDialog must be used inside <DialogProvider />"
    );
  }
  return ctx;
}
