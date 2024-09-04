<script lang="ts">
	import { getAvatarContext } from './AvatarContext'
	
	const { status: statusStore } = getAvatarContext()

	let src: string | null = null
	let alt: string

	$: status = $statusStore;

	export { src, alt }
</script>

<img 
	src={src} 
	alt={alt} 
	style:display={status !== 'loaded' ? 'none' : undefined} 
	data-status={status}
	on:load={() => statusStore.set('loaded')}
	on:loadstart={() => statusStore.set('loading')}
	on:error={() => statusStore.set('error')}
	{...$$restProps}
/>
