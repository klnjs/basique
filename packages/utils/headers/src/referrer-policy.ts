const policies = [
	'no-referrer',
	'no-referrer-when-downgrade',
	'origin',
	'origin-when-cross-origin',
	'same-origin',
	'strict-origin',
	'strict-origin-when-cross-origin',
	'unsafe-url'
] as const

type Policy = (typeof policies)[number]

export class ReferrerPolicy {
	value: Policy

	private constructor(value: Policy) {
		this.value = value
	}

	static parse(text: string): ReferrerPolicy {
		if (!policies.includes(text as Policy)) {
			throw new SyntaxError(
				`ReferrerPolicy.parse: received invalid policy "${text}"`
			)
		}

		return new ReferrerPolicy(text as Policy)
	}

	static stringify(policy: ReferrerPolicy | Policy): string {
		if (typeof policy === 'string') {
			return policy
		}

		return policy.value
	}
}
