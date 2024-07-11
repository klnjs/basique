import { test, expect } from 'bun:test'
import PP from '../src/pp'

test('parse should succeed with valid permissions-policy', () => {
	expect(() => PP.parse('camera=*')).not.toThrow()
	expect(() => PP.parse('camera=()')).not.toThrow()
	expect(() =>
		PP.parse('camera=(self "https://trusted.site.com")')
	).not.toThrow()
})

test('parse should throw with permissions-policy being invalid', () => {
	expect(() => PP.parse('invalid-directive=(self)')).toThrow()
	expect(() => PP.parse('camera=')).toThrow()
	expect(() => PP.parse('camera=(self')).toThrow()
	expect(() => PP.parse('camera=self)')).toThrow()
	expect(() => PP.parse('camera=(*)')).toThrow()
	expect(() => PP.parse('camera=(invalid-allowlist-#%&/)')).toThrow()
})

// test('stringify should succeed and produced serialized content security policy', () => {
// 	expect(
// 		PP.stringify({
// 			'base-uri': ["'none'"],
// 			'connect-src': ["'self'", 'https://trusted.api.com'],
// 			'font-src': ["'self'", 'https://trusted.cdn.com'],
// 			'frame-ancestors': ["'none'"],
// 			'img-src': ["'self'", 'data:', 'https://trusted.cdn.com'],
// 			'media-src': ["'self'", 'mediastream:', 'https://trusted.cdn.com'],
// 			'object-src': ["'none'"],
// 			sandbox: ['allow-forms', 'allow-scripts'],
// 			'script-src': ["'strict-dynamic'", "'nonce-rAnd0m123'"],
// 			'style-src': ["'self'"]
// 		})
// 	).toBe(
// 		"base-uri 'none'; " +
// 		"connect-src 'self' https://trusted.api.com; " +
// 		"font-src 'self' https://trusted.cdn.com; " +
// 		"frame-ancestors 'none'; " +
// 		"img-src 'self' data: https://trusted.cdn.com; " +
// 		"media-src 'self' mediastream: https://trusted.cdn.com; " +
// 		"object-src 'none'; " +
// 		'sandbox allow-forms allow-scripts; ' +
// 		"script-src 'strict-dynamic' 'nonce-rAnd0m123'; " +
// 		"style-src 'self'"
// 	)
// })
