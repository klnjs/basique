import core from '@klnjs/eslint-config/core'
import typescript from '@klnjs/eslint-config/typescript'
import svelte from '@klnjs/eslint-config/svelte'
import ignores from '@klnjs/eslint-config/ignores'

export default [
	core,
	typescript,
	svelte,
	ignores,
	{
		files: ['**/*.svelte'],
		rules: {
			'prefer-const': 'off'
		}
	}
]
