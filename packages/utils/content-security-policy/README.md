# @klnjs/content-security-policy

This module provides types and functionality for parsing and stringifying Content Security Policy (CSP).

## Installation

Install the `@klnjs/content-security-policy` package using your preferred package manager.

```bash
npm install @klnjs/content-security-policy
```

## How to Use

### Importing

Import the module, and optionally the `ContentSecurityPolicy` type.

```ts
import CSP, { type ContentSecurityPolicy } from '@klnjs/content-security-policy'
```

### Parsing

Parse a content security policy string into a `ContentSecurityPolicy` object with the `parse` method:

```ts
const policy = CSP.parse("default-src 'self'; img-src https://example.com")
```

### Stringifying

Serialize a `ContentSecurityPolicy` object with the `stringify` method:

```ts
const value = CSP.stringify({
	'default-src': ["'self'"],
	'img-src': ['https://example.com']
})
```

### Validation

Parsing will validate CSP directives and their source list.

If an invalid directive or source list is encountered during parsing, a SyntaxError is thrown.

```ts
try {
	const policy = CSP.parse("invalid-directive 'self'")
} catch (error) {
	console.error(error) // SyntaxError: ContentSecurityPolicy.parse: invalid directive "invalid-directive"
}
```
