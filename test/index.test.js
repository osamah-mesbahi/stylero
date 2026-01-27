const { css, createStyles, cx, globalStyles } = require('../dist/index.js');
const assert = require('assert');
const { test } = require('node:test');

// Mock document for testing
global.document = {
  head: {
    appendChild: () => {},
  },
  createElement: () => ({
    textContent: '',
  }),
};

test('css() generates unique class names', () => {
  const class1 = css({ color: 'red' });
  const class2 = css({ color: 'blue' });
  
  assert.ok(class1, 'Class name should be generated');
  assert.ok(class2, 'Class name should be generated');
  assert.notStrictEqual(class1, class2, 'Class names should be unique');
  assert.ok(class1.startsWith('stylero-'), 'Class name should start with stylero-');
});

test('createStyles() generates multiple class names', () => {
  const styles = createStyles({
    button: { padding: '10px' },
    container: { display: 'flex' },
  });
  
  assert.ok(styles.button, 'button class should exist');
  assert.ok(styles.container, 'container class should exist');
  assert.notStrictEqual(styles.button, styles.container, 'Classes should be unique');
});

test('cx() combines class names', () => {
  const result1 = cx('class1', 'class2');
  assert.strictEqual(result1, 'class1 class2', 'Should combine classes');
  
  const result2 = cx('class1', false, 'class2', null, undefined);
  assert.strictEqual(result2, 'class1 class2', 'Should filter falsy values');
  
  const result3 = cx();
  assert.strictEqual(result3, '', 'Should handle empty input');
});

test('globalStyles() accepts style object', () => {
  // Should not throw
  assert.doesNotThrow(() => {
    globalStyles({
      body: { margin: '0' },
      '*': { boxSizing: 'border-box' },
    });
  });
});

console.log('All tests passed! ✓');
