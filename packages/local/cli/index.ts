#!/usr/bin/env bun

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import * as build from './src/build'
import * as check from './src/check'
import * as clean from './src/clean'
import * as adorn from './src/adorn'

await yargs(hideBin(process.argv))
	.command([build, check, clean, adorn])
	.demandCommand(1)
	.parse()
