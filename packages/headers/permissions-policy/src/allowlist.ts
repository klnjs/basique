export type AllowList = '*' | ('src' | 'self' | `"http://${string}"` | `"https://${string}"`)[];

export const isAllowList = (list: string | string[]): list is AllowList => {
	if (!Array.isArray(list)) {
		return list === '*'
	}

	if (new Set(list).size !== list.length) {
		return false
	}

	return list.every((value) => /^(?:src|self|"http:\/\/.*"|"https:\/\/.*")$/.test(value))
}
