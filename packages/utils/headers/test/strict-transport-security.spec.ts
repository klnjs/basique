import { test, expect } from 'bun:test'
import { parse, stringify } from '../src/strict-transport-security'

test('parse should succeed with valid strict-transport-security', () => {
	expect(() => parse('max-age=0')).not.toThrow()
	expect(() => parse('max-age=0; preload; includeSubdomains')).not.toThrow()
})

test('parse should throw with invalid strict-transport-security', () => {
	expect(() => parse('')).toThrow()
	expect(() => parse('max-age=0;')).toThrow()
	expect(() => parse('max-age=0; preload=true')).toThrow()
	expect(() => parse('max-age=-200')).toThrow()
	expect(() => parse('preload')).toThrow()
})

test('stringify should succeed with strict-transport-security', () => {
	expect(
		stringify({
			'max-age': 0,
			preload: true,
			includeSubdomains: true
		})
	).toBe('max-age=0; preload; includeSubdomains')
})
