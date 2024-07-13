import { test, expect } from 'bun:test'
import RE from '../src/re'

test('parse should succeed with valid reporting-endpoints', () => {
	expect(() => RE.parse('endpoint=https://trusted.com')).not.toThrow()
	expect(() =>
		RE.parse('endpoint=https://trusted.com, endpoint-2=https://trusted.com')
	).not.toThrow()
})

test('parse should throw with invalid reporting-endpoints', () => {
	expect(() => RE.parse('')).toThrow()
	expect(() => RE.parse('endpoint=0')).toThrow()
	expect(() => RE.parse('endpoint=http://trusted.com')).toThrow()
	expect(() => RE.parse('endpoint=https:/trusted.com')).toThrow()
})

test('stringify should succeed with reporting-endpoints', () => {
	expect(
		RE.stringify({
			endpoint: 'https://trusted.com',
			endpoint2: 'https://trusted.com'
		})
	).toBe('endpoint=https://trusted.com, endpoint2=https://trusted.com')
})
