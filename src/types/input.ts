export type InputFieldType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea' | 'select' | 'checkbox';

export interface InputField {
  name: string;
  label?: string;
  type?: InputFieldType;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | number | boolean;
  options?: string[] | { label: string; value: string }[];
  onChange?: (value: any) => void;
  validation?: (value: any) => string | undefined;
}

export interface InputOptions {
  title?: string;
  description?: string;
  fields: InputField[];
  confirmText?: string;
  cancelText?: string;
  closable?: boolean;
  blur?: boolean;
}

export interface InputDialogOptions extends InputOptions {}

export interface InputResult {
  submitted: boolean;
  values: Record<string, any>;
}

export interface InputDialogProps extends InputDialogOptions {
  onSubmit: (values: Record<string, any>) => void;
  onCancel: () => void;
}
