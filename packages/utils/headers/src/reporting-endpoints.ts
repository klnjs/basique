// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ReportingEndpoints {
	[key: string]: `https://${string}`

	private constructor(options: ReportingEndpoints) {
		Object.assign(this, options)
	}

	static urlRegex = /^(?:https:\/\/.*)$/

	static parse(text: string): ReportingEndpoints {
		return new ReportingEndpoints(
			text.split(',').reduce((acc, entry) => {
				const [key = '', value = ''] = entry.trim().split('=')

				if (key === '') {
					throw new SyntaxError(
						`ReportingEndpoints.parse: received invalid endpoint "${key}"`
					)
				}

				if (!this.urlRegex.test(value)) {
					throw new SyntaxError(
						`ReportingEndpoints.parse: received invalid url "${value}" for endpoint "${key}"`
					)
				}

				return { ...acc, [key]: value }
			}, {}) as ReportingEndpoints
		)
	}

	static stringify(endpoints: ReportingEndpoints): string {
		return Object.entries(endpoints)
			.map(([name, url]) => `${name}=${url}`)
			.join(', ')
	}
}
