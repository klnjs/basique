export type ReportingEndpoints = Record<
	string, `https://${string}`
>

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class RE {
	static parse(text: string): ReportingEndpoints {
		return text.split(',').reduce((acc: ReportingEndpoints, entry) => {
			const [endpoint = '', url = ''] = entry.trim().split('=')

			if (!/^(?:https:\/\/.*)$/.test(url)) {
				throw new SyntaxError(
					`ReportingEndpoints.parse: invalid url "${url}" for endpoint "${endpoint}"`
				)
			}

			return {
				...acc,
				[endpoint]: url
			} as ReportingEndpoints
		}, {})
	}

	static stringify(endpoints: ReportingEndpoints): string {
		return Object.entries(endpoints)
			.map(([name, url]) => `${name}=${url}`)
			.join(', ')
	}
}
