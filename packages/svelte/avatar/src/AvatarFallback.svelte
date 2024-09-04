<script lang="ts">
	import { getAvatarContext } from './AvatarContext'

	const { status } = getAvatarContext()

	let delay: number = 0
	let ready = delay === 0

	setTimeout(() => (ready = true), delay)

	export { delay }
</script>

{#if ready && $status !== 'loaded'}
	<div {...$$restProps}>
		<slot />
	</div>
{/if}
