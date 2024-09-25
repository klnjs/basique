<script lang="ts">
	import type { CoreProps } from '@klnjs/svelte-core'
	import { getAvatarContext } from './AvatarContext'

	type $$Props = CoreProps<
		HTMLDivElement,
		{
			delay?: number
		}
	>

	const { status } = getAvatarContext()

	let ref: $$Props['ref']
	let delay: $$Props['delay'] = 0
	let ready = delay === 0

	setTimeout(() => (ready = true), delay)

	export { ref, delay }
</script>

{#if ready && $status !== 'loaded'}
	<div bind:this="{ref}" {...$$restProps}>
		<slot />
	</div>
{/if}
