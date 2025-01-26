import { test, expect } from 'bun:test'
import { parse, stringify } from '../src/permissions-policy'

test('parse should succeed with valid permissions-policy', () => {
	expect(() => parse('camera=*')).not.toThrow()
	expect(() => parse('camera=()')).not.toThrow()
	expect(() => parse('camera=(self "https://trusted.com")')).not.toThrow()
})

test('parse should throw with invalid permissions-policy', () => {
	expect(() => parse('')).toThrow()
	expect(() => parse('invalid-directive=(self)')).toThrow()
	expect(() => parse('camera')).toThrow()
	expect(() => parse('camera=')).toThrow()
	expect(() => parse('camera=(self')).toThrow()
	expect(() => parse('camera=self)')).toThrow()
	expect(() => parse('camera=(*)')).toThrow()
	expect(() => parse('camera=(invalid-allowlist-#%&/)')).toThrow()
})

test('stringify should succeed with permissions-policy', () => {
	expect(
		stringify({
			autoplay: '*',
			camera: [],
			geolocation: ['self', '"https://trusted.site.com"']
		})
	).toBe(
		'autoplay=*, camera=(), geolocation=(self "https://trusted.site.com")'
	)
})
