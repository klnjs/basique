<script lang="ts">
	import type { CoreProps } from '@klnjs/svelte-core'
	import { createSpinner, type SpinnerOptions } from '@klnjs/spinner'
	import { createSpinnerContext } from './SpinnerContext'

	type $$Props = CoreProps<SVGElement, Partial<SpinnerOptions>>

	let asChild: $$Props['asChild'] = false
	let ref: $$Props['ref']
	let size: number = 24
	let width: number = 4

	$: spinner = createSpinner({ size, width })

	let context = createSpinnerContext(spinner)

	$: context.set(createSpinner({ size, width }))
	$: ({ diameter } = spinner)

	export { asChild, ref, size, width }
</script>

{#if asChild}
	<slot {...$$restProps} />
{:else}
	<svg
		bind:this="{ref}"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="{`0 0 ${diameter} ${diameter}`}"
		width="{diameter}"
		height="{diameter}"
		{...$$restProps}
	>
		<slot />
	</svg>
{/if}
