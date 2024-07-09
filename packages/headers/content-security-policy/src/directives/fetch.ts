// https://www.w3.org/TR/CSP/#directives-fetch
import {
	isSourceList,
	toSourceRegex,
	type None,
	type Source
} from './directive'

const fetchSources = [
	"'self'",
	"'unsafe-inline'",
	"'unsafe-eval'",
	"'strict-dynamic'",
	"'unsafe-hashes'",
	"'report-sample'",
	"'unsafe-allow-redirects'",
	"'wasm-unsafe-eval'",
	"'nonce-*'",
	"'sha256-*'",
	"'sha384-*'",
	"'sha512-*'",
	'http://*',
	'https://*',
	'ws://*',
	'wss://*',
	'ws:',
	'wss:',
	'blob:',
	'data:',
	'http:',
	'https:',
	'filesystem:',
	'mediastream:'
] as const

export type FetchSourceList = None | Source<(typeof fetchSources)[number]>[]

export const isFetchSourceList = (list: string[]): list is FetchSourceList =>
	isSourceList(list, toSourceRegex(fetchSources))
