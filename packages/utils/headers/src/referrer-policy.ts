// https://www.w3.org/TR/referrer-policy

const tokens = [
	'no-referrer',
	'no-referrer-when-downgrade',
	'origin',
	'origin-when-cross-origin',
	'same-origin',
	'strict-origin',
	'strict-origin-when-cross-origin',
	'unsafe-url'
] as const

type PolicyToken = (typeof tokens)[number]

function isPolicyToken(value: string): value is PolicyToken {
	return (tokens as readonly string[]).includes(value)
}

export type ReferrerPolicy = PolicyToken

export function parse(text: string): ReferrerPolicy {
	if (!isPolicyToken(text)) {
		throw new SyntaxError(`Encountered invalid referrer-policy "${text}"`)
	}

	return text
}

export function stringify(policy: ReferrerPolicy): string {
	return policy
}
