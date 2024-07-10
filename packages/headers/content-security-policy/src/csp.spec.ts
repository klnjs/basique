import { test, expect } from 'bun:test'
import CSP from './csp'

test('parse should succeed with source list', () => {
	expect(() =>
		CSP.parse("base-uri 'self' https://trusted.site.com")
	).not.toThrow()
})

test("parse should succeed with source list only including 'none'", () => {
	expect(() => CSP.parse("base-uri 'none'")).not.toThrow()
})

test('parse should throw with source list being empty', () => {
	expect(() => CSP.parse('base-uri')).toThrow()
})

test('parse should throw with source list being invalid', () => {
	expect(() => CSP.parse('base-uri invalid-source-list-#%&/')).toThrow()
})

test("parse should throw with source list including 'none' and other directives", () => {
	expect(() =>
		CSP.parse("base-uri 'none' 'self' https://trusted.site.com")
	).toThrow()
})

test('stringify should succeed and produced serialized content security policy', () => {
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
