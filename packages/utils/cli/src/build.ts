#!/usr/bin/env bun

import { $, type JavaScriptLoader, type TSConfig } from 'bun'
import p from 'path'
import fs from 'node:fs/promises'
import ts from 'typescript'
import type { Argv } from 'yargs'

export type BuildOptions = {
	type: 'typescript' | 'react' | 'svelte'
}

export const name = 'build'

export const description = 'build package for publishing'

export const define = (yargs: Argv) =>
	yargs
		.positional('type', {
			choices: ['typescript', 'react', 'svelte'],
			describe: 'The type of project you are building'
		})
		.demandOption('type')

export const run = async (options: BuildOptions) => {
	const cwd = process.cwd()
	const dist = p.join(cwd, 'dist')

	await fs.mkdir(dist, { recursive: true })

	if (options.type === 'svelte') {
		await svelte(cwd, dist)
	} else {
		await react(cwd, dist)
	}
}

const react = async (root: string, dist: string) => {
	const tsconfig = Bun.resolveSync('./tsconfig.json', root)
	const raw = ts.readConfigFile(tsconfig, ts.sys.readFile)
	const parsed = ts.parseJsonConfigFileContent(raw.config, ts.sys, root)

	await $`tsc --noEmit false --noCheck --declaration --emitDeclarationOnly --composite false --incremental false`
	await Promise.all(
		parsed.fileNames.map(async (path) => {
			const transpiler = new Bun.Transpiler({
				loader: p.extname(path) as JavaScriptLoader,
				minifyWhitespace: false,
				tsconfig: raw.config as TSConfig
			})

			const out = p.join(
				dist,
				path.replace(root, '').replace(/\.tsx?$/g, '.js')
			)

			const file = Bun.file(path)
			const content = await file.text()
			const result = await transpiler.transform(content)

			await Bun.write(out, result)
		})
	)
}

const svelte = async (root: string, dist: string) => {
	const path = p.join(root, '.svelte-package')

	await fs.mkdir(path, { recursive: true })
	await fs.cp(p.join(root, 'src'), p.join(path, 'src'), {
		recursive: true
	})
	await fs.cp(p.join(root, 'index.ts'), p.join(path, 'index.ts'), {
		recursive: true
	})
	await $`svelte-package -i ${path} -o ${dist}`
	await fs.rm('.svelte-kit', { recursive: true, force: true })
	await fs.rm('.svelte-package', { recursive: true, force: true })
}
