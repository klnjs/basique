import { test, expect } from 'bun:test'
import { CSP } from '../src/main'

test('parse should succeed with valid content-security-policy', () => {
	expect(() => CSP.parse("base-uri 'none'")).not.toThrow()
	expect(() => CSP.parse("base-uri 'self' https://trusted.com")).not.toThrow()
})

test('parse should throw with invalid content-security-policy', () => {
	expect(() => CSP.parse('')).toThrow()
	expect(() => CSP.parse("invalid-directive 'self'")).toThrow()
	expect(() => CSP.parse('base-uri')).toThrow()
	expect(() => CSP.parse('base-uri self')).toThrow()
	expect(() => CSP.parse('base-uri invalid-source-list')).toThrow()
	expect(() => CSP.parse("base-uri 'none' 'self'")).toThrow()
})

test('stringify should succeed with content-security-policy', () => {
	expect(
		CSP.stringify({
			'base-uri': ["'none'"],
			'object-src': ["'none'"],
			'script-src': ["'strict-dynamic'", "'nonce-rAnd0m123'"]
		})
	).toBe(
		"base-uri 'none'; object-src 'none'; script-src 'strict-dynamic' 'nonce-rAnd0m123'"
	)
})
