#!/usr/bin/env bun
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { run as build } from './src/build'
import { run as prepublish } from './src/prepublish'

yargs(hideBin(process.argv))
	.command('build', 'build a package', () => {}, build)
	.command(
		'prepublish',
		'prepare a package for publish',
		() => {},
		prepublish
	)
	.demandCommand(1)
	.parse()
