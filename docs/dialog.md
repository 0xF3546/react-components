# Dialog Context

A configurable dialog context for React that allows you to programmatically open confirmation dialogs and wait for the user's response.

## Installation

See [Installation Guide](./installation.md)

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

## Basic Example

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
    } else {
      console.log('Logout cancelled');
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

## API

### `DialogProvider`

The provider that supplies the dialog context.

**Props:**
- `children`: ReactNode (required) - Child components
- `DialogComponent`: ComponentType<DialogProps> (optional) - Custom dialog component

### `useDialog()`

Hook that provides access to dialog functions.

**Returns:**
```typescript
{
  confirm: (options: ConfirmOptions) => Promise<boolean>
}
```

### `useConfirm()`

Alternative hook that directly returns the `confirm` function.

**Returns:**
```typescript
(options: ConfirmOptions) => Promise<boolean>
```

### `ConfirmOptions`

```typescript
interface ConfirmOptions {
  title?: string;        // Dialog title
  message: string;       // Message/content (required)
  confirmText?: string;  // Text for confirm button (default: "Confirm")
  cancelText?: string;   // Text for cancel button (default: "Cancel")
}
```

## Custom Dialog Component

You can create and use your own dialog component.

### 1. Create Custom Component

Create a component that implements `DialogProps`:

```tsx
import { DialogProps } from 'react-components';

export function MyCustomDialog({
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel
}: DialogProps) {
  return (
    <div className="my-dialog-overlay" onClick={onCancel}>
      <div className="my-dialog" onClick={(e) => e.stopPropagation()}>
        {title && <h2 className="my-dialog-title">{title}</h2>}
        
        <p className="my-dialog-message">{message}</p>

        <div className="my-dialog-actions">
          <button 
            className="my-dialog-button-cancel" 
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button 
            className="my-dialog-button-confirm" 
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
import { MyCustomDialog } from './MyCustomDialog';

function App() {
  return (
    <DialogProvider DialogComponent={MyCustomDialog}>
      <YourApp />
    </DialogProvider>
  );
}
```

### Example with Material-UI

```tsx
import { DialogProps } from 'react-components';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';

export function MuiDialog({
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel
}: DialogProps) {
  return (
    <Dialog open onClose={onCancel}>
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
import { MuiDialog } from './MuiDialog';

function App() {
  return (
    <DialogProvider DialogComponent={MuiDialog}>
      <YourApp />
    </DialogProvider>
  );
}
```

### Example with Tailwind CSS

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
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
```

## Advanced Usage

### Multiple Dialogs in Sequence

```tsx
const { confirm } = useDialog();

const handleComplexAction = async () => {
  const step1 = await confirm({
    title: 'Step 1',
    message: 'Do you want to proceed with step 1?'
  });

  if (!step1) return;

  const step2 = await confirm({
    title: 'Step 2',
    message: 'Continue to step 2?'
  });

  if (!step2) return;

  console.log('All steps completed!');
};
```

### With Error Handling

```tsx
const { confirm } = useDialog();

const handleAction = async () => {
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
