import { test, expect } from 'bun:test'
import { ContentSecurityPolicy } from '../src/content-security-policy'

test('parse should succeed with valid content-security-policy', () => {
	expect(() =>
		ContentSecurityPolicy.parse(
			"base-uri 'self'; object-src                       'none'; connect-src *; sandbox allow-downloads allow-forms"
		)
	).not.toThrow()
})

test('parse should throw with invalid content-security-policy', () => {
	expect(() => ContentSecurityPolicy.parse('')).toThrow()
	expect(() =>
		ContentSecurityPolicy.parse("invalid-directive 'self'")
	).toThrow()
	expect(() => ContentSecurityPolicy.parse('base-uri')).toThrow()
	expect(() => ContentSecurityPolicy.parse('base-uri self')).toThrow()
	expect(() =>
		ContentSecurityPolicy.parse('base-uri invalid-source-list')
	).toThrow()
	expect(() =>
		ContentSecurityPolicy.parse("base-uri 'none' 'self'")
	).toThrow()
	expect(() =>
		ContentSecurityPolicy.parse("connect-src 'none' 'self'")
	).toThrow()
	expect(() => ContentSecurityPolicy.parse("sandbox 'none'")).toThrow()
})

test('stringify should succeed with content-security-policy', () => {
	expect(
		ContentSecurityPolicy.stringify({
			'base-uri': "'none'",
			'object-src': "'none'",
			'connect-src': '*',
			'script-src': ["'strict-dynamic'", "'nonce-rAnd0m123'"]
		})
	).toBe(
		"base-uri 'none'; object-src 'none'; connect-src *; script-src 'strict-dynamic' 'nonce-rAnd0m123'"
	)
})
