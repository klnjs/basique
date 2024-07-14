#!/usr/bin/env bun

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { run as build } from './src/build'
import { run as prepublish } from './src/prepublish'

await yargs(hideBin(process.argv))
	.command('build', 'build a package', () => { }, build)
	.command('prepublish', 'prepare a package for publish', () => { }, prepublish)
	.demandCommand(1)
	.parse()
