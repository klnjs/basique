# @klnjs/react-core

A library that simplifies implemention of React components that support the `asChild` paradigm.

## Installation

Install the `@klnjs/react-core` package using your preferred package manager.

```bash
npm install @klnjs/react-core
```

## How to Use

```ts
import { poly, type CoreProps } from '@klnjs/react-core';

export type MyComponentProps = CoreProps<
  'div',
  {
    myCustomProp: string;
  }
>

export const MyComponent = (props: MyComponentProps) => <poly.div {...props} />
```
