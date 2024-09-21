type URL = `https://${string}`

export class ReportingEndpoints {
	[key: string]: URL

	private constructor(options: ReportingEndpoints) {
		Object.assign(this, options)
	}

	private static parseEndpoint(endpoint: string | undefined) {
		if (endpoint === undefined || endpoint === '') {
			throw new SyntaxError(
				`ReportingEndpoints.parse: invalid endpoint "${endpoint}"`
			)
		}

		return endpoint
	}

	private static parseUrl(endpoint: string, url: string | undefined) {
		if (url === undefined || !/^(?:https:\/\/.*)$/.test(url)) {
			throw new SyntaxError(
				`ReportingEndpoints.parse: invalid url "${url}" for endpoint "${endpoint}"`
			)
		}

		return url as URL
	}

	static parse(text: string): ReportingEndpoints {
		return new ReportingEndpoints(
			text.split(',').reduce((acc, entry) => {
				const [key, value] = entry.trim().split('=')
				const name = this.parseEndpoint(key)
				const url = this.parseUrl(name, value)

				return { ...acc, [name]: url }
			}, {}) as ReportingEndpoints
		)
	}

	static stringify(endpoints: ReportingEndpoints): string {
		return Object.entries(endpoints)
			.map(([name, url]) => `${name}=${url}`)
			.join(', ')
	}
}
