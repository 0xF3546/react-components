export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  closable?: boolean;
  blur?: boolean;
}

export interface ConfirmationProps extends ConfirmOptions {
  onConfirm: () => void;
  onCancel: () => void;
}

export interface DialogProps extends ConfirmationProps {}