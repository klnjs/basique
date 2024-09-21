import { test, expect } from 'bun:test'
import { ReferrerPolicy } from '../src/referrer-policy/main'

test('parse should succeed with valid referrer-policy', () => {
	expect(() => ReferrerPolicy.parse('no-referrer')).not.toThrow()
	expect(() =>
		ReferrerPolicy.parse('strict-origin-when-cross-origin')
	).not.toThrow()
})

test('parse should throw with invalid referrer-policy', () => {
	expect(() => ReferrerPolicy.parse('')).toThrow()
	expect(() => ReferrerPolicy.parse('invalid-policy')).toThrow()
})

test('stringify should succeed with referrer-policy', () => {
	expect(ReferrerPolicy.stringify('no-referrer')).toBe('no-referrer')
})
