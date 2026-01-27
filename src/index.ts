/**
 * STYLERO - A lightweight CSS-in-JS styling library
 */

export type StyleObject = {
  [key: string]: string | number | StyleObject;
};

export type ClassNameMap = {
  [key: string]: string;
};

/**
 * Generates a unique class name
 */
let classCounter = 0;
function generateClassName(prefix: string = 'stylero'): string {
  return `${prefix}-${++classCounter}`;
}

/**
 * Converts a style object to CSS string
 */
function styleObjectToCSS(styles: StyleObject, selector: string): string {
  let css = '';
  let nestedCSS = '';
  const declarations: string[] = [];

  for (const [key, value] of Object.entries(styles)) {
    if (typeof value === 'object') {
      // Handle nested selectors (e.g., '&:hover', '& > div')
      const nestedSelector = key.startsWith('&') 
        ? key.replace('&', selector) 
        : `${selector} ${key}`;
      nestedCSS += styleObjectToCSS(value, nestedSelector);
    } else {
      // Convert camelCase to kebab-case
      const cssProperty = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      declarations.push(`  ${cssProperty}: ${value};`);
    }
  }

  if (declarations.length > 0) {
    css = `${selector} {\n${declarations.join('\n')}\n}\n`;
  }

  return css + nestedCSS;
}

/**
 * Creates a stylesheet and injects it into the document head
 */
function injectStyles(css: string): void {
  if (typeof document === 'undefined') {
    return; // Server-side rendering support
  }

  const styleElement = document.createElement('style');
  styleElement.textContent = css;
  document.head.appendChild(styleElement);
}

/**
 * Creates styled classes from style objects
 * @param styles - Object mapping class names to style objects
 * @returns Object mapping original names to generated class names
 */
export function createStyles<T extends ClassNameMap>(
  styles: { [K in keyof T]: StyleObject }
): { [K in keyof T]: string } {
  const classNames = {} as { [K in keyof T]: string };
  let css = '';

  for (const [name, styleObj] of Object.entries(styles)) {
    const className = generateClassName();
    classNames[name as keyof T] = className;
    css += styleObjectToCSS(styleObj as StyleObject, `.${className}`);
  }

  injectStyles(css);
  return classNames;
}

/**
 * Creates a single styled class
 * @param styles - Style object
 * @returns Generated class name
 */
export function css(styles: StyleObject): string {
  const className = generateClassName();
  const cssString = styleObjectToCSS(styles, `.${className}`);
  injectStyles(cssString);
  return className;
}

/**
 * Combines multiple class names
 * @param classNames - Class names to combine
 * @returns Combined class name string
 */
export function cx(...classNames: (string | undefined | null | false)[]): string {
  return classNames.filter(Boolean).join(' ');
}

/**
 * Global styles utility
 * @param styles - Global style object
 */
export function globalStyles(styles: StyleObject): void {
  let css = '';
  
  for (const [selector, styleObj] of Object.entries(styles)) {
    css += styleObjectToCSS(styleObj as StyleObject, selector);
  }
  
  injectStyles(css);
}

export default {
  createStyles,
  css,
  cx,
  globalStyles,
};
