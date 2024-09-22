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
						`ReportingEndpoints.parse: invalid endpoint "${key}"`
					)
				}

				if (!this.urlRegex.test(value)) {
					throw new SyntaxError(
						`ReportingEndpoints.parse: ${key} has invalid value "${value}", value must be a https url`
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
