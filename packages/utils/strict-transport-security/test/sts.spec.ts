import { test, expect } from 'bun:test'
import { STS } from '../src/main'

test('parse should succeed with valid strict-transport-security', () => {
	expect(() => STS.parse('max-age=0')).not.toThrow()
	expect(() =>
		STS.parse('max-age=0; preload; includeSubdomains')
	).not.toThrow()
})

test('parse should throw with invalid strict-transport-security', () => {
	expect(() => STS.parse('')).toThrow()
	expect(() => STS.parse('max-age=0;')).toThrow()
	expect(() => STS.parse('max-age=0; preload=true')).toThrow()
	expect(() => STS.parse('max-age=-200')).toThrow()
	expect(() => STS.parse('preload')).toThrow()
})

test('stringify should succeed with strict-transport-security', () => {
	expect(
		STS.stringify({
			'max-age': 0,
			preload: true,
			includeSubdomains: true
		})
	).toBe('max-age=0; preload; includeSubdomains')
})
