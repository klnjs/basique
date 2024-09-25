<script lang="ts">
	import type { CoreProps } from '@klnjs/svelte-core'
	import { getAvatarContext } from './AvatarContext'

	type $$Props = CoreProps<
		HTMLDivElement,
		{
			src?: string
			alt: string
		}
	>

	const { status: statusStore } = getAvatarContext()

	let ref: $$Props['ref']
	let src: $$Props['src']
	let alt: $$Props['alt']

	$: status = $statusStore

	export { ref, src, alt }
</script>

<img
	{src}
	{alt}
	style:display="{status !== 'loaded' ? 'none' : undefined}"
	data-status="{status}"
	bind:this="{ref}"
	on:load="{() => statusStore.set('loaded')}"
	on:loadstart="{() => statusStore.set('loading')}"
	on:error="{() => statusStore.set('error')}"
	{...$$restProps}
/>
