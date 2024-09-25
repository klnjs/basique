# @klnjs/permissions-policy

This module provides types and functionality for parsing and stringifying Permissions Policy.

## Installation

Install the `@klnjs/permissions-policy` package using your preferred package manager.

```bash
npm install @klnjs/permissions-policy
```

## How to Use

### Importing

Import the module, and optionally the `PermissionsPolicy` type.

```ts
import PP, { type PermissionsPolicy } from '@klnjs/permissions-policy'
```

### Parsing

Parse a permission policy string into a `PermissionsPolicy` object with the `parse` method:

```ts
const policy = PP.parse('camera=(self "https://trusted.com")')
```

### Stringifying

Serialize a `PermissionsPolicy` object with the `stringify` method:

```ts
const header = PP.stringify({ camera: ['self', '"https://trusted.com"'] })
```

### Validation

Parsing validates directives and allowlists. If an invalid directive or source list is encountered during parsing, a SyntaxError is thrown.

```ts
try {
	const policy = PP.parse("invalid-directive 'self'")
} catch (error) {
	console.error(error) // SyntaxError: PermissionsPolicy.parse: invalid directive "invalid-directive"
}
```
