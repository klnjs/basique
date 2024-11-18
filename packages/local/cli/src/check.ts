#!/usr/bin/env bun

import { $ } from 'bun'

export const command = 'check'

export const description = 'check package for problems'

export const builder = {}

export const handler = async () => {
	await $`tsc --noEmit`
}
