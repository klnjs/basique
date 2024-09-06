# @klnjs/reporting-endpoints

This module provides types and functionality for parsing and stringifying Strict Transport Security (HSTS).

## Installation

Install the `@klnjs/reporting-endpoints` package using your preferred package manager.

```bash
npm install @klnjs/reporting-endpoints
```

## How to Use

### Importing

Import the module, and optionally the `ReportingEndpoints` type.

```ts
import STS, { type ReportingEndpoints } from '@klnjs/reporting-endpoints'
```

### Parsing

Parse a permission policy string into a `ReportingEndpoints` object with the `parse` method:

```ts
const endpoints = RE.parse('endpoint=https://trusted.com')
```

### Stringifying

Serialize a `ReportingEndpoints` object with the `stringify` method:

```ts
const header = RE.stringify({ endpoint: 'https://trusted.com' })
```

### Validation

Parsing validates endpoints and urls. If an invalid endpoint or url is encountered during parsing, a SyntaxError is thrown.

```ts
try {
	const endpoints = RE.parse('endpoint=invalid-url')
} catch (error) {
	console.error(error) // SyntaxError: ReportingEndpoints.parse: invalid url "invalid-url" for endpoint "endpoint"
}
```
