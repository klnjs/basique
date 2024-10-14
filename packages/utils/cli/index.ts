#!/usr/bin/env bun

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import * as build from './src/build'
import * as check from './src/check'
import * as clean from './src/clean'
import * as prepare from './src/prepare'

await yargs(hideBin(process.argv))
	.command(build.name, build.description, build.define, build.run)
	.command(check.name, check.description, check.define, check.run)
	.command(clean.name, clean.description, clean.define, clean.run)
	.command(prepare.name, prepare.description, prepare.define, prepare.run)
	.demandCommand(1)
	.parse()
