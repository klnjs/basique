import type { Argv } from 'yargs'

export type CheckOptions = {
	type: 'typescript' | 'react' | 'svelte'
}

export const name = 'check'

export const description = 'check package for problems'

export const define = (yargs: Argv) =>
	yargs
		.positional('type', {
			choices: ['typescript', 'react', 'svelte'],
			describe: 'The type of project you are building'
		})
		.demandOption('type')

export const run = (_options: CheckOptions) => {
	console.log('Reserved command')
}
