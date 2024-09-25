import { test, expect } from 'bun:test'
import { ReportingEndpoints } from '../src/reporting-endpoints'

test('parse should succeed with valid reporting-endpoints', () => {
	expect(() =>
		ReportingEndpoints.parse('endpoint=https://trusted.com')
	).not.toThrow()
	expect(() =>
		ReportingEndpoints.parse(
			'endpoint=https://trusted.com, endpoint-2=https://trusted.com'
		)
	).not.toThrow()
})

test('parse should throw with invalid reporting-endpoints', () => {
	expect(() => ReportingEndpoints.parse('')).toThrow()
	expect(() => ReportingEndpoints.parse('endpoint=0')).toThrow()
	expect(() =>
		ReportingEndpoints.parse('endpoint=http://trusted.com')
	).toThrow()
	expect(() =>
		ReportingEndpoints.parse('endpoint=https:/trusted.com')
	).toThrow()
})

test('stringify should succeed with reporting-endpoints', () => {
	expect(
		ReportingEndpoints.stringify({
			endpoint: 'https://trusted.com',
			endpoint2: 'https://trusted.com'
		})
	).toBe('endpoint=https://trusted.com, endpoint2=https://trusted.com')
})
