import { test, expect } from 'bun:test'
import { parse, stringify } from '../src/referrer-policy'

test('parse should succeed with valid referrer-policy', () => {
	expect(() => parse('no-referrer')).not.toThrow()
	expect(() => parse('strict-origin-when-cross-origin')).not.toThrow()
})

test('parse should throw with invalid referrer-policy', () => {
	expect(() => parse('')).toThrow()
	expect(() => parse('invalid-policy')).toThrow()
})

test('stringify should succeed with referrer-policy', () => {
	expect(stringify('no-referrer')).toBe('no-referrer')
})
