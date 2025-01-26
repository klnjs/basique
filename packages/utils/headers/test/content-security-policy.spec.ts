import { test, expect } from 'bun:test'
import { parse, stringify } from '../src/content-security-policy'

test('parse should succeed with valid content-security-policy', () => {
	expect(() =>
		parse(
			"base-uri 'self'; object-src  'none'; connect-src *; sandbox allow-downloads allow-forms"
		)
	).not.toThrow()
})

test('parse should throw with invalid content-security-policy', () => {
	expect(() => parse('')).toThrow()
	expect(() => parse("invalid-directive 'self'")).toThrow()
	expect(() => parse('base-uri')).toThrow()
	expect(() => parse('base-uri self')).toThrow()
	expect(() => parse('base-uri invalid-source-list')).toThrow()
	expect(() => parse("base-uri 'none' 'self'")).toThrow()
	expect(() => parse("connect-src 'none' 'self'")).toThrow()
	expect(() => parse("sandbox 'none'")).toThrow()
})

test('stringify should succeed with content-security-policy', () => {
	expect(
		stringify({
			'base-uri': "'none'",
			'object-src': "'none'",
			'connect-src': '*',
			'script-src': ["'strict-dynamic'", "'nonce-rAnd0m123'"]
		})
	).toBe(
		"base-uri 'none'; object-src 'none'; connect-src *; script-src 'strict-dynamic' 'nonce-rAnd0m123'"
	)
})
