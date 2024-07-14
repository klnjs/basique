#!/usr/bin/env bun

/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { findUp } from 'find-up'

export const run = async () => {
	const cwd = process.cwd()
	const pathToPackage = await findUp('package.json', { cwd })
	const pathToLicense = await findUp('LICENSE', { cwd })

	if (pathToPackage === undefined) {
		throw new Error('Could not find package.json')
	}

	if (pathToLicense === undefined) {
		throw new Error('Could not find LICENSE')
	}

	const json = await Bun.file(pathToPackage).json()
	const license = await Bun.file(pathToLicense).text()

	if (json.private !== true) {
		if (json.publishConfig) {
			if (json.publishConfig.exports) {
				json.exports = json.publishConfig.exports
			}

			delete json.publishConfig
		}

		await Bun.write('./LICENSE', license)
		await Bun.write('./package.json', JSON.stringify(json, null, 2))
	}
}
