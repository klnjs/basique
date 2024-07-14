#!/usr/bin/env bun

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { join } from 'path'
import { mkdir, rm } from 'node:fs/promises'
import ts, { type Diagnostic } from 'typescript'
import type { BuildOutput } from 'bun'

export const run = async () => {
	const cwd = process.cwd()
	const dist = join(cwd, 'dist')
	const manifest = Bun.resolveSync('./package.json', cwd)
	const tsconfig = Bun.resolveSync('./tsconfig.json', cwd)
	const entrypoint = Bun.resolveSync('./index.ts', cwd)

	await rm(dist, { recursive: true, force: true })
	await mkdir(dist, { recursive: true })

	const built = await build(dist, { manifest, entrypoint })
	const emitted = await emit(dist, { tsconfig, cwd })

	if (!built.success) {
		throw new AggregateError(built.logs, 'Build failed')
	}

	if (!emitted.success) {
		throw new AggregateError(emitted.diagostics, 'Emit failed')
	}
}

type EmitConfig = { cwd: string; tsconfig: string }

type EmitOutput = {
	success: boolean
	diagostics: readonly Diagnostic[]
}

const emit = async (
	outdir: string,
	{ cwd, tsconfig }: EmitConfig
): Promise<EmitOutput> => {
	const raw = ts.readConfigFile(tsconfig, ts.sys.readFile)
	const parsed = ts.parseJsonConfigFileContent(raw.config, ts.sys, cwd)

	const program = ts.createProgram({
		rootNames: parsed.fileNames,
		options: {
			...parsed.options,
			outDir: outdir,
			noEmit: false,
			declaration: true,
			emitDeclarationOnly: true
		}
	})

	const result = program.emit()

	return Promise.resolve({
		success: !result.emitSkipped,
		diagostics: result.diagnostics
	})
}

type BuildConfig = {
	manifest: string
	entrypoint: string
}

const build = async (
	outdir: string,
	{ manifest, entrypoint }: BuildConfig
): Promise<BuildOutput> => {
	const config = await Bun.file(manifest).json()
	const result = await Bun.build({
		outdir,
		entrypoints: [entrypoint],
		external: [
			'dependencies',
			'devDependencies',
			'peerDependencies'
		].flatMap((section) => Object.keys(config[section] ?? {}))
	})

	return result
}
