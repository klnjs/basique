# @klnjs/content-security-policy

This module provides functionality for parsing and stringifying Content Security Policies (CSP) in JavaScript. It helps in handling CSP directives and their respective source lists, making it easier to manage web security policies.

## Installation

You can install the `@klnjs/content-security-policy` package using your preferred package manager.

```bash
npm install @klnjs/content-security-policy
```

## How to Use

### Importing

Simply import the CSP module, and optionally the `ContentSecurityPolicy` type.

```ts
import CSP, { type ContentSecurityPolicy } from 'csp-parser';
```

### Parsing

To parse a CSP string into a `ContentSecurityPolicy` object, use the `CSP.parse` method:

```ts
const csp = CSP.parse("default-src 'self'; img-src https://example.com");
```

### Stringifying

To serialize a `ContentSecurityPolicy` object, use the `CSP.stringify` method:

```ts
const value = CSP.stringify({
  'default-src': ["'self'"],
  'img-src': ['https://example.com']
});
```

### Validation

The parser validates CSP directives and their source lists. If an invalid directive or source list is encountered during parsing, a SyntaxError is thrown.

```ts
try {
  const csp = CSP.parse("invalid-directive 'self'");
} catch (error) {
  console.error(error); // SyntaxError: ContentSecurityPolicy.parse: invalid directive invalid-directive
}
```
