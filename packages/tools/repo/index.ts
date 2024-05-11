#!/usr/bin/env bun

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { build } from './src/build'
import { prepare } from './src/prepare'

yargs(hideBin(process.argv))
	.command('build', 'build a package in the repository', () => {}, build)
	.command('prepare', 'prepare a package for publish', () => {}, prepare)
	.demandCommand(1)
	.parse()
