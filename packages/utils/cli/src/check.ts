export type CheckArgv = {
	type: 'typescript' | 'react' | 'svelte'
}

export const command = 'check <type>'

export const description = 'check package for problems'

export const builder = (argv) =>
	argv.positional('type', {
		choices: ['typescript', 'react', 'svelte'],
		describe: 'The type of project you are building',
		demandOption: true
	})

export const handler = async (_argv) => {
	console.log('Reserved command')
}
