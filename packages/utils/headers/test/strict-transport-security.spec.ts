import { test, expect } from 'bun:test'
import { StrictTransportSecurity } from '../src/strict-transport-security'

test('parse should succeed with valid strict-transport-security', () => {
	expect(() => StrictTransportSecurity.parse('max-age=0')).not.toThrow()
	expect(() =>
		StrictTransportSecurity.parse('max-age=0; preload; includeSubdomains')
	).not.toThrow()
})

test('parse should throw with invalid strict-transport-security', () => {
	expect(() => StrictTransportSecurity.parse('')).toThrow()
	expect(() => StrictTransportSecurity.parse('max-age=0;')).toThrow()
	expect(() =>
		StrictTransportSecurity.parse('max-age=0; preload=true')
	).toThrow()
	expect(() => StrictTransportSecurity.parse('max-age=-200')).toThrow()
	expect(() => StrictTransportSecurity.parse('preload')).toThrow()
})

test('stringify should succeed with strict-transport-security', () => {
	expect(
		StrictTransportSecurity.stringify({
			'max-age': 0,
			preload: true,
			includeSubdomains: true
		})
	).toBe('max-age=0; preload; includeSubdomains')
})
