import { test, expect } from 'bun:test'
import { PermissionsPolicy } from '../src/permissions-policy'

test('parse should succeed with valid permissions-policy', () => {
	expect(() => PermissionsPolicy.parse('camera=*')).not.toThrow()
	expect(() => PermissionsPolicy.parse('camera=()')).not.toThrow()
	expect(() =>
		PermissionsPolicy.parse('camera=(self "https://trusted.com")')
	).not.toThrow()
})

test('parse should throw with invalid permissions-policy', () => {
	expect(() => PermissionsPolicy.parse('')).toThrow()
	expect(() => PermissionsPolicy.parse('invalid-directive=(self)')).toThrow()
	expect(() => PermissionsPolicy.parse('camera')).toThrow()
	expect(() => PermissionsPolicy.parse('camera=')).toThrow()
	expect(() => PermissionsPolicy.parse('camera=(self')).toThrow()
	expect(() => PermissionsPolicy.parse('camera=self)')).toThrow()
	expect(() => PermissionsPolicy.parse('camera=(*)')).toThrow()
	expect(() =>
		PermissionsPolicy.parse('camera=(invalid-allowlist-#%&/)')
	).toThrow()
})

test('stringify should succeed with permissions-policy', () => {
	expect(
		PermissionsPolicy.stringify({
			autoplay: '*',
			camera: [],
			geolocation: ['self', '"https://trusted.site.com"']
		})
	).toBe(
		'autoplay=*, camera=(), geolocation=(self "https://trusted.site.com")'
	)
})
