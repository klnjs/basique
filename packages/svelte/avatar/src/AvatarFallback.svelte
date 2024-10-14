<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements'
	import { getAvatarContext } from './AvatarContext'

	type AvatarFallbackProps = HTMLAttributes<HTMLDivElement> & {
		ref?: HTMLDivElement
		delay?: number
	}

	const { status } = getAvatarContext()

	let { ref, children, delay, ...otherProps }: AvatarFallbackProps = $props()

	let ready = $state<Boolean>(false)

	setTimeout(() => (ready = true), delay)
</script>

{#if ready && status !== 'loaded'}
	<div bind:this="{ref}" {...otherProps}>
		{#if children}
			{@render children()}
		{/if}
	</div>
{/if}
