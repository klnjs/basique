<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'
	import type { AvatarStatus } from '@klnjs/avatar'
	import { setAvatarContext } from './AvatarContext'

	type AvatarProps = HTMLAttributes<HTMLDivElement> & {
		ref?: HTMLDivElement
		children?: Snippet
		onStatusChange?: (status: AvatarStatus) => void
	}

	let { ref, children, onStatusChange, ...otherProps }: AvatarProps = $props()

	let status = $state<AvatarStatus>('idle')

	$effect(() => {
		if (onStatusChange) {
			onStatusChange(status)
		}

		setAvatarContext({ status })
	})
</script>

<div bind:this="{ref}" {...otherProps}>
	{#if children}
		{@render children()}
	{/if}
</div>
