import { test, expect } from 'bun:test'
import RP from '../src/rp'

test('parse should succeed with valid referrer-policy', () => {
	expect(() => RP.parse('no-referrer')).not.toThrow()
	expect(() => RP.parse('strict-origin-when-cross-origin')).not.toThrow()
})

test('parse should throw with invalid referrer-policy', () => {
	expect(() => RP.parse('invalid-policy')).toThrow()
})

test('stringify should succeed with referrer-policy', () => {
	expect(RP.stringify('no-referrer')).toBe('no-referrer')
})
