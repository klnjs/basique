#!/usr/bin/env bun

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { run as build } from './src/build'
import { run as clean } from './src/clean'
import { run as prepare } from './src/arrange'

await yargs(hideBin(process.argv))
	.command(
		'build',
		'build package distribution',
		(yarg) =>
			yarg
				.option('react', { type: 'boolean' })
				.option('svelte', { type: 'boolean' })
				.conflicts('react', 'svelte'),
		async (argv) => build(argv)
	)
	.command('clean', 'clean package build and caches', () => {}, clean)
	.command('arrange', 'arrange package for publishing', () => {}, prepare)
	.demandCommand(1)
	.parse()
