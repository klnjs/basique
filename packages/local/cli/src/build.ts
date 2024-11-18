#!/usr/bin/env bun

import { $ } from 'bun'
import p from 'path'
import fs from 'node:fs/promises'

export const command = 'build'

export const description = 'build package for publishing'

export const builder = {}

export const handler = async () => {
	const cwd = process.cwd()
	const dist = p.join(cwd, 'dist')

	await fs.mkdir(dist, { recursive: true })
	await $`tsc --noCheck --declaration`
}
