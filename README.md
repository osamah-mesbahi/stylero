# Stylero 🎨

A lightweight, type-safe CSS-in-JS styling library for modern web applications.

## Features

- 🚀 Lightweight - Zero dependencies
- 💪 Type-safe - Full TypeScript support
- 🎯 Simple API - Easy to learn and use
- ⚡ Fast - Minimal runtime overhead
- 🔧 Flexible - Supports nested styles and pseudo-selectors

## Installation

```bash
npm install stylero
```

## Usage

### Basic Styling

```typescript
import { css } from 'stylero';

const buttonClass = css({
  backgroundColor: '#007bff',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
});

// Use in your HTML
<button className={buttonClass}>Click me</button>
```

### Multiple Styles

```typescript
import { createStyles } from 'stylero';

const styles = createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
  },
});

// Use in your component
<div className={styles.container}>
  <h1 className={styles.title}>Hello Stylero!</h1>
  <button className={styles.button}>Get Started</button>
</div>
```

### Combining Classes

```typescript
import { cx } from 'stylero';

const baseClass = css({ padding: '10px' });
const activeClass = css({ backgroundColor: 'blue' });

// Conditionally combine classes
<div className={cx(baseClass, isActive && activeClass)}>
  Content
</div>
```

### Global Styles

```typescript
import { globalStyles } from 'stylero';

globalStyles({
  body: {
    margin: '0',
    padding: '0',
    fontFamily: 'Arial, sans-serif',
  },
  '*': {
    boxSizing: 'border-box',
  },
});
```

## API Reference

### `css(styles: StyleObject): string`

Creates a single CSS class from a style object and returns the generated class name.

### `createStyles<T>(styles: { [K in keyof T]: StyleObject }): { [K in keyof T]: string }`

Creates multiple CSS classes from an object of style objects. Returns an object mapping original keys to generated class names.

### `cx(...classNames: (string | undefined | null | false)[]): string`

Combines multiple class names into a single string, filtering out falsy values.

### `globalStyles(styles: StyleObject): void`

Injects global styles into the document.

## TypeScript Support

Stylero is written in TypeScript and provides full type safety:

```typescript
import { StyleObject, createStyles } from 'stylero';

const myStyles: StyleObject = {
  color: 'red',
  fontSize: '16px',
  // TypeScript will catch any invalid properties
};
```

## License

MIT