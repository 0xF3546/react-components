import {
  createContext,
  useContext,
  useState,
  ReactNode,
  ComponentType
} from "react";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { ConfirmModal } from "../components/ConfirmModal";
import { ConfirmOptions, ConfirmationProps } from "../types";
import { useComponentOverrides } from "./ComponentOverrideContext";
import React from "react";

type DialogRequest = ConfirmOptions & {
  resolve: (value: boolean) => void;
  closable: boolean;
  blur: boolean;
};

type DialogContextType = {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  confirmModal: (options: ConfirmOptions) => Promise<boolean>;
};

const DialogContext = createContext<DialogContextType | null>(null);

interface DialogProviderProps {
  children: ReactNode;
  ConfirmationComponent?: ComponentType<ConfirmationProps>;
}

export function DialogProvider({ 
  children, 
  ConfirmationComponent
}: DialogProviderProps) {
  const [dialog, setDialog] = useState<DialogRequest | null>(null);
  const globalComponents = useComponentOverrides();

  const confirm = (options: ConfirmOptions) =>
    new Promise<boolean>((resolve) => {
      setDialog({ 
        ...options,
        components: { ...globalComponents, ...options.components },
        resolve, 
        closable: options.closable ?? true, 
        blur: options.blur ?? false 
      });
    });

  const confirmModal = (options: ConfirmOptions) =>
    new Promise<boolean>((resolve) => {
      setDialog({ 
        ...options,
        components: { ...globalComponents, ...options.components },
        resolve, 
        closable: options.closable ?? false, 
        blur: options.blur ?? true 
      });
    });

  const close = (result: boolean) => {
    dialog?.resolve(result);
    setDialog(null);
  };

  const DefaultComponent = dialog?.closable ? ConfirmDialog : ConfirmModal;
  const Component = ConfirmationComponent ?? DefaultComponent;

  return (
    <DialogContext value={{ confirm, confirmModal }}>
      {children}

      {dialog && (
        <Component
          title={dialog.title}
          message={dialog.message}
          confirmText={dialog.confirmText}
          cancelText={dialog.cancelText}
          closable={dialog.closable}
          blur={dialog.blur}
          components={dialog.components}
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

export function useConfirmModal() {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error(
      "useConfirmModal must be used inside <DialogProvider />"
    );
  }
  return ctx.confirmModal;
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
