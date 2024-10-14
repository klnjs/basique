<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements'
	import { getAvatarContext } from './AvatarContext'

	type AvatarImageProps = HTMLImgAttributes & {
		ref?: HTMLDivElement
		src?: string
		alt: string
	}

	let { status } = getAvatarContext()

	let { ref, src, alt, ...otherProps }: AvatarImageProps = $props()
</script>

<img
	bind:this="{ref}"
	{src}
	{alt}
	style:display="{status !== 'loaded' ? 'none' : undefined}"
	data-status="{status}"
	onload="{() => (status = 'loaded')}"
	onloadstart="{() => (status = 'loading')}"
	onerror="{() => (status = 'error')}"
	{...otherProps}
/>
