# Dialog & Modal Context

A configurable confirmation context for React that provides both dialogs and modals. Use it to programmatically open confirmations and wait for the user's response.

## Installation

See [Installation Guide](./installation.md)

## Dialog vs Modal

### Dialog
- **Closable**: Can be dismissed by clicking outside the dialog or pressing Escape
- **No blur**: Background is darkened but not blurred by default
- **Use case**: Non-critical confirmations, optional actions

### Modal
- **Not closable**: Can only be dismissed via buttons
- **Blur effect**: Background is blurred by default for emphasis
- **Use case**: Critical actions that require explicit user decision

Both dialogs and modals can have their `closable` and `blur` options customized.

## Quick Start

### 1. Setup Provider

Wrap your app with the `DialogProvider`:

```tsx
import { DialogProvider } from 'react-components';

function App() {
  return (
    <DialogProvider>
      <YourApp />
    </DialogProvider>
  );
}
```

### 2. Use Dialog

Use the `useDialog` hook in your components:

```tsx
import { useDialog } from 'react-components';

function MyComponent() {
  const { confirm } = useDialog();

  const handleDelete = async () => {
    const result = await confirm({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this item? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });

    if (result) {
      // User confirmed
      console.log('Item deleted');
    } else {
      // User cancelled
      console.log('Action cancelled');
    }
  };

  return (
    <button onClick={handleDelete}>
      Delete Item
    </button>
  );
}
```

### 3. Use Modal

Use `confirmModal` for critical actions:

```tsx
import { useDialog } from 'react-components';

function MyComponent() {
  const { confirmModal } = useDialog();

  const handleCriticalAction = async () => {
    const result = await confirmModal({
      title: 'Warning',
      message: 'This will permanently delete your account. This action cannot be undone.',
      confirmText: 'Delete Account',
      cancelText: 'Cancel'
    });

    if (result) {
      // User confirmed critical action
      console.log('Account deleted');
    }
  };

  return (
    <button onClick={handleCriticalAction}>
      Delete Account
    </button>
  );
}
```

## Basic Examples

### Dialog Example

```tsx
import { useDialog } from 'react-components';

export default function ExampleApp() {
  const { confirm } = useDialog();

  const handleLogout = async () => {
    const result = await confirm({
      title: 'Logout',
      message: 'Are you sure you want to logout?',
      confirmText: 'Logout',
      cancelText: 'Stay'
    });

    if (result) {
      console.log('User logged out');
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

### Modal Example

```tsx
import { useDialog } from 'react-components';

export default function ExampleApp() {
  const { confirmModal } = useDialog();

  const handleTerms = async () => {
    const result = await confirmModal({
      title: 'Terms of Service',
      message: 'Please read and accept our terms of service to continue.',
      confirmText: 'Accept',
      cancelText: 'Decline'
    });

    if (result) {
      console.log('Terms accepted');
    } else {
      console.log('Terms declined');
    }
  };

  return <button onClick={handleTerms}>Show Terms</button>;
}
```

## API

### `DialogProvider`

The provider that supplies the confirmation context for both dialogs and modals.

**Props:**
- `children`: ReactNode (required) - Child components
- `ConfirmationComponent`: ComponentType<ConfirmationProps> (optional) - Custom confirmation component for both dialogs and modals

### `useDialog()`

Hook that provides access to both dialog and modal functions.

**Returns:**
```typescript
{
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  confirmModal: (options: ConfirmOptions) => Promise<boolean>;
}
```

### `useConfirm()`

Hook that directly returns the `confirm` function (for dialogs).

**Returns:**
```typescript
(options: ConfirmOptions) => Promise<boolean>
```

### `useConfirmModal()`

Hook that directly returns the `confirmModal` function (for modals).

**Returns:**
```typescript
(options: ConfirmOptions) => Promise<boolean>
```

### `ConfirmOptions`
Confirmation Component

You can create and use your own confirmation component that will be used for both dialogs and modals.

### 1. Create Custom Component

Create a component that implements `ConfirmationProps`:

```tsx
import { ConfirmationProps } from 'react-components';

export function MyCustomConfirmation({
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  closable = true,
  blur = false,
  onConfirm,
  onCancel
}: ConfirmationProps) {
  return (
    <div 
      className="my-confirmation-overlay"
      style={{ backdropFilter: blur ? 'blur(4px)' : undefined }}
      onClick={closable ? onCancel : undefined}
    >
      <div className="my-confirmation" onClick={(e) => e.stopPropagation()}>
        {title && <h2 className="my-confirmation-title">{title}</h2>}
        
        <p className="my-confirmation-message">{message}</p>

        <div className="my-confirmation-actions">
          <button 
            className="my-confirmation-button-cancel" 
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button 
            className="my-confirmation-button-confirm" 
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 2. Use Custom Component

Pass your component to the `DialogProvider`:

```tsx
import { DialogProvider } from 'react-components';
import { MyCustomConfirmation } from './MyCustomConfirmation';

function App() {
  return (
    <DialogProvider ConfirmationComponent={MyCustomConfirmation}>
      <YourApp />
    </DialogProvider>
  );
}
```

The same component will be used for both `confirm()` and `confirmModal()`, with different `closable` and `blur` props.
### 2. Use Custom Component

Pass your component to the `DialogProvider`:

```tsx
import { DialogProvider } from 'react-components';
import { MyCustomDialog } from './MyCustomDialog';

function App() {
  return (
    <DialogProvider DialogComponent={MyCustomDialog}>
      <YourApp />
    </DiaConfirmationProps } from 'react-components';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Backdrop
} from '@mui/material';

export function MuiConfirmation({
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  closable = true,
  blur = false,
  onConfirm,
  onCancel
}: ConfirmationProps) {
  return (
    <Dialog 
      open 
      onClose={closable ? onCancel : undefined}
      BackdropComponent={blur ? Backdrop : undefined}
      BackdropProps={blur ? { sx: { backdropFilter: 'blur(4px)' } } : undefined}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{cancelText}</Button>
        <Button onClick={onConfirm} variant="contained" autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
```

Usage:

```tsx
import { DialogProvider } from 'react-components';
import { MuiConfirmation } from './MuiConfirmation';

function App() {
  return (
    <DialogProvider ConfirmationComponent={MuiConfirmation

```tsxConfirmationProps } from 'react-components';

export function TailwindConfirmation({
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  closable = true,
  blur = false,
  onConfirm,
  onCancel
}: ConfirmationProps) {
  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        blur ? 'backdrop-blur-sm' : ''
      }`}
      onClick={closable ? onCancel : undefinednd CSS

```tsx
import { DialogProps } from 'react-components';

export function TailwindDialog({
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel
}: DialogProps) {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <div 
        className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
        )}
        
        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex gap-3 justify-end">
          <button 
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={onConfirm}
          >Confirmations in Sequence

```tsx
const { confirm, confirmModal } = useDialog();

const handleComplexAction = async () => {
  // First: regular dialog
  const step1 = await confirm({
    title: 'Step 1',
    message: 'Do you want to proceed with step 1?'
  });

  if (!step1) return;

  // Second: modal (requires explicit choice)
  const step2 = await confirmModal({
    title: 'Step 2 - Critical',
    message: 'This is a critical step. Are you sure?'
  });

  if (!step2) return;

  console.log('All steps completed!');
};
```

### Customizing Blur and Closable

```tsx
const { confirm, confirmModal } = useDialog();

// Dialog with blur effect
const showImportantDialog = async () => {
  await confirm({
    message: 'Important notification',
    blur: true  // Override default (false for dialogs)
  });
};

// Modal that can be closed by clicking outside
const showFlexibleModal = async () => {
  await confirmModal({
    message: 'Optional modal',
    closable: true  // Override default (false for modals)
  });
};
```

### With Error Handling

```tsx
const { confirmModal } = useDialog();

const handleAction = async () => {
  try {
    const confirmed = await confirmModal
  console.log('All steps completed!');
};
```

### With Error Handling

```tsx
const { confirm } = useDialog();
useConfirmModal,
  ConfirmOptions, 
  ConfirmationProps,
  DialogProps,
  ModalPropstion = async () => {
  try {
    const confirmed = await confirm({
      title: 'Dangerous Action',
      message: 'This action cannot be undone!',
      confirmText: 'I understand',
      cancelText: 'Go back'
    });

    if (confirmed) {
      await performDangerousAction();
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## TypeScript Support

All components and hooks are fully typed:

```typescript
import { 
  DialogProvider, 
  useDialog, 
  useConfirm,
  ConfirmOptions, 
  DialogProps 
} from 'react-components';
```

## Best Practices

1. **Place Provider at Root**: Place the `DialogProvider` as high as possible in your component hierarchy to make it available everywhere.

2. **No Nested Providers**: Avoid multiple nested `DialogProvider` instances. One provider per app is sufficient.

3. **Async Usage**: Use `async/await` for better readability:
   ```tsx
   const result = await confirm({ message: 'Are you sure?' });
   ```

4. **Error Boundaries**: Wrap your app with Error Boundaries to catch errors.

5. **Accessibility**: When creating custom components, ensure:
   - Keyboard Navigation (Tab, Enter, Escape)
   - ARIA Labels
   - Focus Management
