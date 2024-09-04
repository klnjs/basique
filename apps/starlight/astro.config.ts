import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import svelte from '@astrojs/svelte'
import starlight from '@astrojs/starlight'

const mdxs = new Bun.Glob('components/**/*.mdx').scan('src/content/docs')
const components = await Array.fromAsync(mdxs)

// https://astro.build/config
export default defineConfig({
	site: 'https://klnjs.github.io',
	base: 'basique',
	integrations: [
		react(),
		svelte(),
		starlight({
			title: 'Basique',
			logo: {
				src: './src/assets/logo-glyph.svg'
			},
			social: {
				github: 'https://github.com/klnjs/basique'
			},
			sidebar: [
				{ label: 'Start', autogenerate: { directory: 'start' } },
				{
					label: 'Components',
					items: components
						.map((file) => file.replace(/\.[^/.]+$/, ''))
						.toSorted()
				}
			],
			components: {
				PageTitle: './src/library/Title.astro'
			}
		})
	]
})
