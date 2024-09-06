#!/usr/bin/env bun

import { join } from 'path'
import { rm } from 'node:fs/promises'

export const run = async () => {
	const cwd = process.cwd()
	const dist = join(cwd, 'dist')
	const license = join(cwd, 'LICENSE')

	await rm(dist, { recursive: true, force: true })
	await rm(license, { force: true })
}
