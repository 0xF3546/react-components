export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export interface DialogProps extends ConfirmOptions {
  onConfirm: () => void;
  onCancel: () => void;
}
