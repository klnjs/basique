// https://www.w3.org/TR/reporting-1

const secureUrlRegex = /^(?:https:\/\/.*)$/

type SecureUrl = `https://${string}`

function isSecureUrl(value: string): value is SecureUrl {
	return secureUrlRegex.test(value)
}

export type ReportingEndpoints = {
	[key: string]: SecureUrl
}

export function parse(text: string): ReportingEndpoints {
	return text.split(',').reduce((acc: ReportingEndpoints, entry) => {
		const [key, value = ''] = entry.trim().split('=')

		if (key === undefined || key === '') {
			throw new SyntaxError(
				`Encountered invalid reporting-endpoints name "${key}"`
			)
		}

		if (!isSecureUrl(value)) {
			throw new SyntaxError(
				`Encountered invalid reporting-endpoints url "${value}"`
			)
		}

		acc[key] = value

		return acc
	}, {})
}

export function stringify(endpoints: ReportingEndpoints): string {
	return Object.entries(endpoints)
		.map(([name, url]) => `${name}=${url}`)
		.join(', ')
}
