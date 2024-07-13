import { test, expect } from 'bun:test'
import PP from '../src/pp'

test('parse should succeed with valid permissions-policy', () => {
	expect(() => PP.parse('camera=*')).not.toThrow()
	expect(() => PP.parse('camera=()')).not.toThrow()
	expect(() => PP.parse('camera=(self "https://trusted.com")')).not.toThrow()
})

test('parse should throw with invalid permissions-policy', () => {
	expect(() => PP.parse('')).toThrow()
	expect(() => PP.parse('invalid-directive=(self)')).toThrow()
	expect(() => PP.parse('camera')).toThrow()
	expect(() => PP.parse('camera=')).toThrow()
	expect(() => PP.parse('camera=(self')).toThrow()
	expect(() => PP.parse('camera=self)')).toThrow()
	expect(() => PP.parse('camera=(*)')).toThrow()
	expect(() => PP.parse('camera=(invalid-allowlist-#%&/)')).toThrow()
})

test('stringify should succeed with permissions-policy', () => {
	expect(
		PP.stringify({
			autoplay: '*',
			camera: [],
			geolocation: ['self', '"https://trusted.site.com"']
		})
	).toBe(
		'autoplay=*, ' +
		'camera=(), ' +
		'geolocation=(self "https://trusted.site.com")'
	)
})
