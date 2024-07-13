const directives = ['max-age', 'includeSubdomains', 'preload'] as const

export type Directive = (typeof directives)[number]

export const isDirective = (text: string): text is Directive =>
	directives.includes(text as Directive)
