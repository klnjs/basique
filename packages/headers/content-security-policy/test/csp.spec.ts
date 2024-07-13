import { test, expect } from 'bun:test'
import CSP from '../src/csp'

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
			'connect-src': ["'self'", 'https://trusted.api.com'],
			'font-src': ["'self'", 'https://trusted.cdn.com'],
			'frame-ancestors': ["'none'"],
			'img-src': ["'self'", 'data:', 'https://trusted.cdn.com'],
			'media-src': ["'self'", 'mediastream:', 'https://trusted.cdn.com'],
			'object-src': ["'none'"],
			sandbox: ['allow-forms', 'allow-scripts'],
			'script-src': ["'strict-dynamic'", "'nonce-rAnd0m123'"],
			'style-src': ["'self'"]
		})
	).toBe(
		"base-uri 'none'; " +
		"connect-src 'self' https://trusted.api.com; " +
		"font-src 'self' https://trusted.cdn.com; " +
		"frame-ancestors 'none'; " +
		"img-src 'self' data: https://trusted.cdn.com; " +
		"media-src 'self' mediastream: https://trusted.cdn.com; " +
		"object-src 'none'; " +
		'sandbox allow-forms allow-scripts; ' +
		"script-src 'strict-dynamic' 'nonce-rAnd0m123'; " +
		"style-src 'self'"
	)
})
