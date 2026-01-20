# Base Components

The library provides default base components for buttons, inputs, and other form elements. These are automatically used in all dialogs but can be replaced with custom components either globally or per-dialog.

## Available Base Components

- `Button` - Standard button with primary/secondary variants
- `Input` - Standard text input
- `Textarea` - Standard textarea
- `Select` - Standard select/dropdown
- `Checkbox` - Standard checkbox with label

## Quick Start

### Global Custom Components

Configure components once for your entire application:

```tsx
import { ComponentContextProvider } from 'react-components';
import { Button, TextField, Select } from '@mui/material';

function App() {
  return (
    <ComponentContextProvider
      components={{
        Button: Button as any,
        Input: TextField as any,
        Select: Select as any
      }}
    >
      <YourApp />
    </ComponentContextProvider>
  );
}
```

Now all dialogs throughout your app will use Material-UI components automatically.

### Per-Dialog Override

Override components for specific dialogs:

```tsx
import { useDialog } from 'react-components';
import { Button } from './CustomButton';

function MyComponent() {
  const { confirm } = useDialog();

  const handleAction = () => {
    confirm({
      title: 'Confirm Action',
      message: 'Are you sure?',
      components: {
        Button: Button // Override just for this dialog
      }
    }).then(confirmed => {
      if (confirmed) console.log('Confirmed!');
    });
  };

  return <button onClick={handleAction}>Open Dialog</button>;
}
```

## Using Base Components Directly

```tsx
import { Button, Input, Select, Textarea, Checkbox } from 'react-components';

function MyForm() {
  return (
    <form>
      <Input 
        type="email" 
        placeholder="Email" 
        error={false}
      />
      
      <Textarea 
        placeholder="Message" 
        rows={4}
      />
      
      <Select>
        <option>Option 1</option>
        <option>Option 2</option>
      </Select>
      
      <Checkbox 
        label="Accept terms" 
        checked={true}
      />
      
      <Button variant="primary">Submit</Button>
      <Button variant="secondary">Cancel</Button>
    </form>
  );
}
```

## Examples

### Material-UI Integration

```tsx
import { ComponentContextProvider } from 'react-components';
import { 
  Button, 
  TextField, 
  Select, 
  Checkbox,
  TextareaAutosize 
} from '@mui/material';

// Global configuration
function App() {
  return (
    <ComponentContextProvider
      components={{
        Button: Button as any,
        Input: TextField as any,
        Select: Select as any,
        Textarea: TextareaAutosize as any,
        Checkbox: Checkbox as any
      }}
    >
      <YourApp />
    </ComponentContextProvider>
  );
}

// All dialogs now use Material-UI
function MyComponent() {
  const { confirm } = useDialog();
  const { inputDialog } = useInputDialog();

  const handleConfirm = () => {
    confirm({
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item?'
    }).then(confirmed => {
      if (confirmed) deleteItem();
    });
  };

  const handleInput = () => {
    inputDialog({
      title: 'User Details',
      fields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' }
      ],
      onSubmit: (values) => {
        console.log(values);
      }
    });
  };

  return (
    <>
      <button onClick={handleConfirm}>Delete</button>
      <button onClick={handleInput}>Enter Info</button>
    </>
  );
}
```

### Tailwind CSS Custom Components

```tsx
import { ComponentContextProvider, type ButtonProps } from 'react-components';

// Custom Tailwind Components
function TailwindButton({ variant, children, ...props }: ButtonProps) {
  const classes = variant === 'primary'
    ? 'bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium'
    : 'bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded font-medium';
    
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

function TailwindInput({ error, ...props }: InputProps) {
  const classes = `w-full px-3 py-2 border rounded ${
    error ? 'border-red-500' : 'border-gray-300'
  } focus:outline-none focus:ring-2 focus:ring-blue-500`;
  
  return <input className={classes} {...props} />;
}

// Apply globally
function App() {
  return (
    <ComponentContextProvider
      components={{
        Button: TailwindButton,
        Input: TailwindInput
      }}
    >
      <YourApp />
    </ComponentContextProvider>
  );
}
```

### Mixing Global and Per-Dialog Components

```tsx
import { ComponentContextProvider, useDialog } from 'react-components';
import { Button as MuiButton } from '@mui/material';
import { Button as CustomButton } from './CustomButton';

// Set Material-UI as default
function App() {
  return (
    <ComponentContextProvider
      components={{
        Button: MuiButton as any
      }}
    >
      <YourApp />
    </ComponentContextProvider>
  );
}

// Override for specific dialog
function SpecialComponent() {
  const { confirm } = useDialog();

  const handleSpecial = () => {
    confirm({
      title: 'Special Action',
      message: 'This dialog uses a custom button',
      components: {
        Button: CustomButton // Override just for this one
      }
    });
  };

  return <button onClick={handleSpecial}>Special Dialog</button>;
}
```

## API Reference

### Base Component Props

#### Button

```typescript
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}
```

#### Input

```typescript
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}
```

#### Textarea

```typescript
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}
```

#### Select

```typescript
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}
```

#### Checkbox

```typescript
interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
```

### Component Override Types

#### GlobalComponentOverrides

Used in `ComponentContextProvider`:

```typescript
interface GlobalComponentOverrides {
  Button?: ComponentType<ButtonProps>;
  Input?: ComponentType<InputProps>;
  Textarea?: ComponentType<TextareaProps>;
  Select?: ComponentType<SelectProps>;
  Checkbox?: ComponentType<CheckboxProps>;
}
```

#### ComponentOverrides (Dialog/Modal)

Per-dialog override for `confirm()` and `confirmModal()`:

```typescript
interface ComponentOverrides {
  Button?: ComponentType<ButtonProps>;
}
```

#### InputComponentOverrides (InputDialog)

Per-dialog override for `inputDialog()`:

```typescript
interface InputComponentOverrides {
  Button?: ComponentType<ButtonProps>;
  Input?: ComponentType<InputProps>;
  Textarea?: ComponentType<TextareaProps>;
  Select?: ComponentType<SelectProps>;
  Checkbox?: ComponentType<CheckboxProps>;
}
```

## Component Resolution

Components are resolved in the following order:

1. **Per-dialog components** (passed in `components` prop)
2. **Global components** (configured in `ComponentContextProvider`)
3. **Base components** (library defaults)

Example:

```tsx
<ComponentContextProvider components={{ Button: MuiButton }}>
  {/* Uses MuiButton globally */}
  
  <Dialog /> {/* Uses MuiButton */}
  
  <Dialog components={{ Button: CustomButton }} /> {/* Uses CustomButton */}
</ComponentContextProvider>
```

## Best Practices

1. **Set Global Defaults**: Configure your UI library components once in `ComponentContextProvider`
2. **Override When Needed**: Use per-dialog overrides for special cases
3. **Type Safety**: Import and use the provided TypeScript types
4. **Consistent Props**: Ensure custom components accept the required props
5. **Testing**: Base components are minimal - use your own components for production

## Common Patterns

### Loading States

```tsx
import { Button } from 'react-components';

function LoadingButton({ loading, children, ...props }) {
  return (
    <Button {...props} disabled={loading}>
      {loading ? 'Loading...' : children}
    </Button>
  );
}

// Use globally
<ComponentContextProvider components={{ Button: LoadingButton }}>
```

### Form Validation Styling

```tsx
function ValidatedInput({ error, helperText, ...props }) {
  return (
    <div>
      <Input error={error} {...props} />
      {helperText && (
        <span style={{ color: error ? 'red' : 'gray' }}>
          {helperText}
        </span>
      )}
    </div>
  );
}
```

### Accessibility Enhancements

```tsx
function AccessibleButton({ children, ...props }) {
  return (
    <Button 
      {...props}
      role="button"
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {children}
    </Button>
  );
}
```

## Troubleshooting

### Components Not Applying

Make sure `ComponentContextProvider` wraps your entire app:

```tsx
// ✅ Correct
<ComponentContextProvider components={{ Button: CustomButton }}>
  <App />
</ComponentContextProvider>

// ❌ Wrong - provider not wrapping dialogs
<App>
  <ComponentContextProvider components={{ Button: CustomButton }}>
    <SomeComponent />
  </ComponentContextProvider>
</App>
```

### Type Errors

Use type assertions for third-party components:

```tsx
import { Button } from '@mui/material';

<ComponentContextProvider
  components={{
    Button: Button as any // Use 'as any' if types don't match exactly
  }}
>
```

### Styling Not Working

Custom components receive className/style props - make sure to spread them:

```tsx
function CustomButton({ className, style, ...props }) {
  return (
    <button 
      className={`custom-base ${className}`} 
      style={{ ...baseStyle, ...style }}
      {...props}
    />
  );
}
```
