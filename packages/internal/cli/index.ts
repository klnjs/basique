#!/usr/bin/env bun

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { run as build } from './src/build'
import { run as clean } from './src/clean'
import { run as license } from './src/license'

await yargs(hideBin(process.argv))
	.command(
		'build',
		'build a package',
		(yarg) =>
			yarg
				.option('react', { type: 'boolean' })
				.option('svelte', { type: 'boolean' })
				.conflicts('react', 'svelte'),
		async (argv) => build(argv)
	)
	.command('clean', 'clean package build', () => {}, clean)
	.command('license', 'copy license to package', () => {}, license)
	.demandCommand(1)
	.parse()
