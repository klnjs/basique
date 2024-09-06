#!/usr/bin/env bun

import { $ } from 'bun'
import { join } from 'path'
import { mkdir, cp, rm } from 'node:fs/promises'

export type BuildOptions = {
	react?: boolean
} & {
	svelte?: boolean
}

export const run = async (options: BuildOptions) => {
	const cwd = process.cwd()
	const dist = join(cwd, 'dist')

	await mkdir(dist, { recursive: true })

	if (options.svelte) {
		const temp = join(cwd, 'temp')

		await mkdir(temp, { recursive: true })
		await cp(join(cwd, 'src'), join(temp, 'src'), { recursive: true })
		await cp(join(cwd, 'index.ts'), join(temp, 'index.ts'), {
			recursive: true
		})
		await $`svelte-package -i ./temp`
		await rm(temp, { recursive: true, force: true })
		await rm('.svelte-kit', { recursive: true, force: true })
	} else {
		await $`tsc --noEmit false --declaration --composite false --removeComments --allowImportingTsExtensions false`
	}
}
