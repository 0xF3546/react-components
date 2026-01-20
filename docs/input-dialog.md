# Input Dialog

A flexible input dialog system for React that allows you to collect user input through forms with validation, multiple field types, and callback handling.

## Installation

See [Installation Guide](./installation.md)

## Quick Start

### 1. Setup Provider

Wrap your app with the `InputProvider`:

```tsx
import { InputProvider } from 'react-components';

function App() {
  return (
    <InputProvider>
      <YourApp />
    </InputProvider>
  );
}
```

### 2. Use Input Dialog

Use the `useInputDialog` hook in your components:

```tsx
import { useInputDialog } from 'react-components';

function MyComponent() {
  const { inputDialog } = useInputDialog();

  const handleCollectInfo = () => {
    inputDialog({
      title: 'User Information',
      description: 'Please enter your details',
      fields: [
        { 
          name: 'name', 
          label: 'Name', 
          type: 'text', 
          required: true 
        },
        { 
          name: 'email', 
          label: 'Email', 
          type: 'email', 
          required: true 
        }
      ],
      onSubmit: (values) => {
        console.log('User data:', values);
        // { name: "John Doe", email: "john@example.com" }
      },
      onCancel: () => {
        console.log('Cancelled');
      }
    });
  };

  return <button onClick={handleCollectInfo}>Enter Info</button>;
}
```

## Field Types

The input dialog supports multiple field types:

- `text` - Standard text input
- `email` - Email input with validation
- `password` - Password input (masked)
- `number` - Numeric input
- `tel` - Telephone number
- `url` - URL input
- `textarea` - Multi-line text area
- `select` - Dropdown selection
- `checkbox` - Boolean checkbox

## Basic Examples

### Simple Form

```tsx
import { useInputDialog } from 'react-components';

function LoginForm() {
  const { inputDialog } = useInputDialog();

  const handleLogin = () => {
    inputDialog({
      title: 'Login',
      description: 'Please enter your credentials',
      fields: [
        { 
          name: 'username', 
          label: 'Username', 
          type: 'text', 
          required: true 
        },
        { 
          name: 'password', 
          label: 'Password', 
          type: 'password', 
          required: true 
        }
      ],
      confirmText: 'Login',
      cancelText: 'Cancel',
      onSubmit: (values) => {
        login(values.username, values.password);
      },
      onCancel: () => {
        console.log('Login cancelled');
      }
    });
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

### Form with Validation

```tsx
const { inputDialog } = useInputDialog();

const handleRegister = () => {
  inputDialog({
    title: 'Register',
    fields: [
      { 
        name: 'email', 
        label: 'Email', 
        type: 'email', 
        required: true,
        validation: (value) => {
          if (!value.includes('@')) return 'Invalid email address';
          if (!value.endsWith('.com')) return 'Email must end with .com';
        }
      },
      { 
        name: 'age', 
        label: 'Age', 
        type: 'number', 
        required: true,
        validation: (value) => {
          if (value < 18) return 'Must be 18 or older';
          if (value > 120) return 'Invalid age';
        }
      }
    ],
    onSubmit: (values) => {
      register(values.email, values.age);
    }
  });
};
```

### Select and Checkbox

```tsx
const { inputDialog } = useInputDialog();

const handlePreferences = () => {
  inputDialog({
    title: 'Preferences',
    description: 'Configure your settings',
    fields: [
    {
      name: 'theme',
      label: 'Theme',
      type: 'select',
      options: ['Light', 'Dark', 'Auto'],
      defaultValue: 'Auto'
    },
    {
      name: 'country',
      label: 'Country',
      type: 'select',
      options: [
        { label: 'United States', value: 'US' },
        { label: 'United Kingdom', value: 'UK' },
        { label: 'Germany', value: 'DE' }
      ]
    },
    {
      name: 'newsletter',
      label: 'Subscribe to newsletter',
      type: 'checkbox',
      defaultValue: false
    }
    ],
    onSubmit: (values) => {
      savePreferences(values);
    }
  });
};
```

### Textarea

```tsx
const { inputDialog } = useInputDialog();

const handleFeedback = () => {
  inputDialog({
    title: 'Feedback',
    description: 'Tell us what you think',
    fields: [
      {
        name: 'feedback',
        label: 'Your Feedback',
        type: 'textarea',
        placeholder: 'Enter your feedback here...',
        required: true
      }
    ],
    confirmText: 'Submit',
    onSubmit: (values) => {
      submitFeedback(values.feedback);
    }
  });
};
```

## Using onChange Callbacks

You can provide `onChange` callbacks for real-time updates on individual fields:

```tsx
const { inputDialog } = useInputDialog();

const handleSettings = () => {
  inputDialog({
    title: 'Settings',
    fields: [
      {
        name: 'volume',
        label: 'Volume',
        type: 'number',
        defaultValue: 50,
        onChange: (value) => {
          console.log('Volume changed:', value);
          setVolume(value); // Update immediately
        }
      },
      {
        name: 'notifications',
        label: 'Enable notifications',
        type: 'checkbox',
        defaultValue: true,
        onChange: (value) => {
          console.log('Notifications:', value);
          updateNotificationSettings(value);
        }
      }
    ],
    onSubmit: (values) => {
      console.log('Final settings:', values);
    }
  });
};
```

## API

### `InputProvider`

The provider that supplies the input dialog context.

**Props:**
- `children`: ReactNode (required) - Child components
- `InputDialogComponent`: ComponentType<InputDialogProps> (optional) - Custom input dialog component

### `useInputDialog()`

Hook that provides access to the input dialog function.

**Returns:**
```typescript
{
  inputDialog: (options: InputDialogOptions) => void
}
```

### `InputDialogOptions`

```typescript
interface InputDialogOptions {
  title?: string;           // Dialog title
  description?: string;     // Description text
  fields: InputField[];     // Array of input fields (required)
  confirmText?: string;     // Text for submit button (default: "Submit")
  cancelText?: string;      // Text for cancel button (default: "Cancel")
  closable?: boolean;       // Allow closing by clicking outside (default: true)
  blur?: boolean;           // Apply blur effect to background (default: false)
  onSubmit?: (values: Record<string, any>) => void;  // Called when form is submitted
  onCancel?: () => void;    // Called when form is cancelled
}
```

### `InputField`

```typescript
interface InputField {
  name: string;                    // Field identifier (required)
  label?: string;                  // Display label
  type?: InputFieldType;           // Field type (default: 'text')
  placeholder?: string;            // Placeholder text
  required?: boolean;              // Whether field is required
  defaultValue?: string | number | boolean;  // Default value
  options?: string[] | { label: string; value: string }[];  // For select fields
  onChange?: (value: any) => void; // Callback on value change
  validation?: (value: any) => string | undefined;  // Custom validation
}
```

### `InputResult`

*Note: InputResult is returned when using the Promise-based API (advanced usage). For standard usage with callbacks, use the `onSubmit` parameter directly.*

```typescript
interface InputResult {
  submitted: boolean;              // Whether user submitted or cancelled
  values: Record<string, any>;     // Field values by name
}
```

## Advanced Usage

### Dynamic Fields

```tsx
const { inputDialog } = useInputDialog();

const handleDynamicForm = () => {
  const fields = [];

  if (needsEmail) {
    fields.push({ name: 'email', label: 'Email', type: 'email', required: true });
  }

  if (needsPhone) {
    fields.push({ name: 'phone', label: 'Phone', type: 'tel' });
  }

  inputDialog({
    title: 'Contact Information',
    fields,
    onSubmit: (values) => {
      console.log('Contact:', values);
    }
  });
};
```

### With Blur Effect

```tsx
const { inputDialog } = useInputDialog();

const handleCriticalInput = () => {
  inputDialog({
    title: 'Critical Input',
    description: 'Please provide the required information',
    blur: true,  // Background blur for emphasis
    closable: false,  // Must use buttons to close
    fields: [
      { name: 'reason', label: 'Reason', type: 'textarea', required: true }
    ],
    onSubmit: (values) => {
      handleCriticalData(values.reason);
    }
  });
};
```

### Combining with Dialogs

```tsx
function MyComponent() {
  const { confirm } = useDialog();
  const { inputDialog } = useInputDialog();

  const handleAction = () => {
    // First collect data
    inputDialog({
      title: 'Enter Details',
      fields: [{ name: 'name', label: 'Name', required: true }],
      onSubmit: async (values) => {
        // Then confirm action
        const confirmed = await confirm({
          message: `Create user ${values.name}?`
        });

        if (confirmed) {
          createUser(values);
        }
      }
    });
  };
}
```

## Custom Input Dialog Component

You can create your own input dialog component:

```tsx
import { InputDialogProps } from 'react-components';

export function MyCustomInputDialog({
  title,
  description,
  fields,
  confirmText,
  cancelText,
  onSubmit,
  onCancel
}: InputDialogProps) {
  // Your custom implementation
  return (
    <div className="custom-input-dialog">
      {/* Custom styling and logic */}
    </div>
  );
}

// Use it
function App() {
  return (
    <InputProvider InputDialogComponent={MyCustomInputDialog}>
      <YourApp />
    </InputProvider>
  );
}
```

## TypeScript Support

All components and hooks are fully typed:

```typescript
import { 
  InputProvider, 
  useInputDialog,
  InputDialogOptions,
  InputResult,
  InputField,
  InputFieldType,
  InputDialogProps
} from 'react-components';
```

## Best Practices

1. **Validation**: Always validate critical inputs using the `validation` function
2. **Required Fields**: Mark required fields with `required: true`
3. **Default Values**: Provide sensible defaults with `defaultValue`
4. **Clear Labels**: Use descriptive labels for better UX
5. **Error Handling**: Handle form submission in the `onSubmit` callback
6. **Real-time Updates**: Use `onChange` for immediate feedback when needed
