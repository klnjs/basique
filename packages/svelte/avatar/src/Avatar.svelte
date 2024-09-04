<script lang="ts">
	import { writable } from 'svelte/store'
	import { setAvatarContext } from './AvatarContext'
	import type { AvatarStatus } from './AvatarTypes'

	let status = writable<AvatarStatus>('idle')

	setAvatarContext({ status })
</script>
 
<div {...$$restProps}>
	<slot />
</div>
