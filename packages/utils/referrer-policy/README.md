# @klnjs/referrer-policy

This module provides types and functionality for parsing and stringifying Referrer Policy.

## Installation

Install the `@klnjs/referrer-policy` package using your preferred package manager.

```bash
npm install @klnjs/referrer-policy
```

## How to Use

### Importing

Import the module, and optionally the `ReferrerPolicy` type.

```ts
import RR, { type ReferrerPolicy } from '@klnjs/referrer-policy'
```

### Parsing

Parse a permission policy string into a `ReferrerPolicy` object with the `parse` method:

```ts
const policy = RR.parse('strict-origin-when-cross-origin')
```

### Stringifying

Serialize a `ReferrerPolicy` object with the `stringify` method:

```ts
const header = RR.stringify('strict-origin-when-cross-origin')
```

### Validation

Parsing validates the referrer policy. If an invalid policy is encountered, a SyntaxError is thrown.

```ts
try {
	const policy = RR.parse('invalid-policy')
} catch (error) {
	console.error(error) // SyntaxError: ReferrerPolicy.parse: invalid policy "invalid-policy"
}
```
