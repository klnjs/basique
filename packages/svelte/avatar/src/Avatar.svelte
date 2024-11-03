<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'
	import type { AvatarStatus } from '@klnjs/avatar'
	import { setAvatarContext } from './AvatarContext'

	type Props = HTMLAttributes<HTMLDivElement> & {
		ref?: HTMLDivElement
		children?: Snippet
		onStatusChange?: (status: AvatarStatus) => void
	}

	let { ref, children, onStatusChange, ...otherProps }: Props = $props()

	let status: AvatarStatus = $state('idle')

	const setStatus = (value: AvatarStatus) => (status = value)

	setAvatarContext({ status, setStatus })

	$effect(() => {
		if (onStatusChange) {
			onStatusChange(status)
		}
	})
</script>

<div bind:this={ref} {...otherProps}>
	{#if children}
		{@render children()}
	{/if}
</div>
