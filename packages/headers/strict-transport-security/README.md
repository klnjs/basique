# @klnjs/strict-transport-security

This module provides types and functionality for parsing and stringifying Strict Transport Security (HSTS).

## Installation

Install the `@klnjs/strict-transport-security` package using your preferred package manager.

```bash
npm install @klnjs/strict-transport-security
```

## How to Use

### Importing

Import the module, and optionally the `StrictTransportSecurity` type.

```ts
import STS, {
	type StrictTransportSecurity
} from '@klnjs/strict-transport-security'
```

### Parsing

Parse a permission policy string into a `StrictTransportSecurity` object with the `parse` method:

```ts
const policy = STS.parse('max-age=63072000; preload; includeSubdomains')
```

### Stringifying

Serialize a `StrictTransportSecurity` object with the `stringify` method:

```ts
const header = STS.stringify({ 'max-age': 63072000 })
```

### Validation

Parsing validates directives and values. If an invalid directive or value is encountered during parsing, a SyntaxError is thrown.

```ts
try {
	const policy = STS.parse('invalid-directive=63072000')
} catch (error) {
	console.error(error) // SyntaxError: StrictTransportSecurity.parse: invalid directive "invalid-directive"
}
```
