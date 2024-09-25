#!/usr/bin/env bun

import { join } from 'path'
import { rm } from 'node:fs/promises'

export const run = async () => {
	const cwd = process.cwd()

	await rm(join(cwd, '.svelte-package'), { recursive: true, force: true })
	await rm(join(cwd, '.svelte-kit'), { recursive: true, force: true })
	await rm(join(cwd, '.turbo'), { recursive: true, force: true })
	await rm(join(cwd, 'node_modules'), { recursive: true, force: true })
	await rm(join(cwd, 'dist'), { recursive: true, force: true })
	await rm(join(cwd, 'LICENSE'), { recursive: true, force: true })
	await rm(join(cwd, 'tsconfig.tsbuildinfo'), {
		recursive: true,
		force: true
	})
}
