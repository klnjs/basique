<script lang="ts">
	import { writable } from 'svelte/store'
	import type { CoreProps } from '@klnjs/svelte-core'
	import type { AvatarStatus } from '@klnjs/avatar'
	import { setAvatarContext } from './AvatarContext'

	type $$Props = CoreProps<
		HTMLDivElement,
		{
			onStatusChange?: (status: AvatarStatus) => void
		}
	>

	let asChild: $$Props['asChild'] = false
	let ref: $$Props['ref']
	let status = writable<AvatarStatus>('idle')
	let onStatusChange: $$Props['onStatusChange'] = undefined

	setAvatarContext({ status })

	$: onStatusChange && onStatusChange($status)

	export { asChild, ref, onStatusChange }
</script>

{#if asChild}
	<slot {...$$restProps} />
{:else}
	<div bind:this="{ref}" {...$$restProps}>
		<slot />
	</div>
{/if}
