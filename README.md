# React Components

A simple, lightweight React component library for dialogs, modals, and input forms. Perfect for developers who are new to React or need quick, straightforward UI components without the complexity of larger UI frameworks.

## Features

- 🎯 **Simple API** - Easy to understand and use, especially for React beginners
- 🎨 **Customizable** - Use built-in components or replace with your own (Material-UI, Tailwind, etc.)
- 📦 **Lightweight** - Minimal dependencies, small bundle size
- 💪 **TypeScript** - Full type safety out of the box
- ⚡ **Context-based** - Clean state management using React Context API

## Quick Start

### Installation

```bash
npm install react-components
```

### Basic Usage

```tsx
import { ComponentContextProvider, useDialog, useInputDialog } from 'react-components';

function App() {
  return (
    <ComponentContextProvider>
      <MyComponent />
    </ComponentContextProvider>
  );
}

function MyComponent() {
  const { confirm } = useDialog();
  const { inputDialog } = useInputDialog();

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item?'
    });
    
    if (confirmed) {
      // Delete logic
    }
  };

  const handleInput = () => {
    inputDialog({
      title: 'Enter Details',
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true }
      ],
      onSubmit: (values) => {
        console.log('Form values:', values);
      }
    });
  };

  return (
    <>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleInput}>Enter Info</button>
    </>
  );
}
```

## What's Included

- **Dialog** - Closable confirmation dialogs
- **Modal** - Non-closable dialogs with blur effect
- **InputDialog** - Form dialogs with validation
- **Base Components** - Button, Input, Textarea, Select, Checkbox

## Why This Library?

This library is designed for developers who are **new to React** or need **simple, straightforward solutions** without the overhead of learning complex UI frameworks. It provides:

- Clean, intuitive APIs that are easy to understand
- Simple component patterns that teach good React practices
- Minimal configuration required to get started
- Easy customization path as you grow

If you're looking for a gentle introduction to React component libraries or need quick dialog solutions without diving into Material-UI or Ant Design documentation, this is for you.

## Documentation

For detailed documentation, examples, and advanced usage:

- [Installation Guide](docs/installation.md)
- [Dialog & Modal](docs/dialog.md)
- [Input Dialog](docs/input-dialog.md)
- [Base Components & Customization](docs/base-components.md)

## Customization

While the library includes basic styled components, you can easily replace them with your preferred UI library:

```tsx
import { ComponentContextProvider } from 'react-components';
import { Button, TextField } from '@mui/material';

function App() {
  return (
    <ComponentContextProvider
      components={{
        Button: Button,
        Input: TextField
      }}
    >
      <YourApp />
    </ComponentContextProvider>
  );
}
```

See the [Base Components documentation](docs/base-components.md) for more details.

## Requirements

- React >= 19.0.8

## License

MIT

## Contributing

Contributions are welcome! This project aims to stay simple and beginner-friendly, so please keep that in mind when proposing changes.
