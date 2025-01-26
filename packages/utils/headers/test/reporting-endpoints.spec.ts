import { test, expect } from 'bun:test'
import { parse, stringify } from '../src/reporting-endpoints'

test('parse should succeed with valid reporting-endpoints', () => {
	expect(() => parse('endpoint=https://trusted.com')).not.toThrow()
	expect(() =>
		parse('endpoint=https://trusted.com, endpoint-2=https://trusted.com')
	).not.toThrow()
})

test('parse should throw with invalid reporting-endpoints', () => {
	expect(() => parse('')).toThrow()
	expect(() => parse('endpoint=0')).toThrow()
	expect(() => parse('endpoint=http://trusted.com')).toThrow()
	expect(() => parse('endpoint=https:/trusted.com')).toThrow()
})

test('stringify should succeed with reporting-endpoints', () => {
	expect(
		stringify({
			endpoint: 'https://trusted.com',
			endpoint2: 'https://trusted.com'
		})
	).toBe('endpoint=https://trusted.com, endpoint2=https://trusted.com')
})
