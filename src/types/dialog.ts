import { ComponentType } from "react";
import { ButtonProps } from "../components/base";

export interface ComponentOverrides {
  Button?: ComponentType<ButtonProps>;
}

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  closable?: boolean;
  blur?: boolean;
  components?: ComponentOverrides;
}

export interface ConfirmationProps extends ConfirmOptions {
  onConfirm: () => void;
  onCancel: () => void;
}

export interface DialogProps extends ConfirmationProps {}